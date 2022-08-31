import {Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { Router, ActivatedRoute} from "@angular/router";
import { UserService } from "../../service/user/user.service";
import {User} from "../../models/user";
import { NzMessageService } from "ng-zorro-antd/message";
import { MessagePushService } from "../../service/message-push/message-push.service";
import { Subscription } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm!:FormGroup;
  isLoading = false;
  messageSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private nzMessageService: NzMessageService,
    private messagePushService: MessagePushService,
    private nzNotificationService: NzNotificationService,
  ) { }

  ngOnInit() {
    this.Init();
  }

  async Init() { //把:void去掉了，async不能有那么多多余类型
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      remember:[false],
    })

    // const lastUser = localStorage.getItem('lastUser');
    // if (lastUser) {
    //   const username = JSON.parse(lastUser).username;
    //   const password = JSON.parse(lastUser).password;
    //   this.loginForm.get('username')?.patchValue(username);
    //   this.loginForm.get('password')?.patchValue(password);
    // }
    const lastUser:any = await this.userService.getLastUser() //node层返回用的是send，直接给的object
    if (lastUser) {
        this.loginForm.get('username')?.patchValue(lastUser.username);
        this.loginForm.get('password')?.patchValue(lastUser.password);
        this.loginForm.get('remember')?.patchValue(lastUser.remember);
    }

    this.messagePushService.initService();
    this.messageSubscription = this.messagePushService.message$.subscribe(
      (next:any) => {
        this.nzNotificationService.blank(
            next.title,
            next.content,
            { nzDuration: 1500 } //单位是毫秒
          );
      }
    );
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  async login() {
    this.isLoading = true
    const signInRes = await this.userService.signIn(this.loginForm.value)
    if (signInRes >= 0) {
      this.nzMessageService.success('登录成功');
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    } else {
      if (signInRes == -1) {
        this.nzMessageService.info('密码错误');
      } else if (signInRes == -2) {
        this.nzMessageService.info('不存在的用户');
      } else if (signInRes == -3) { //其实不需要-3，传输发生错误就直接没值了，直接else就行，或者try...catch
        this.nzMessageService.error('数据库连接失败');
      }
      this.isLoading = false;
    }
  }

  forgotPassword() {
    this.messagePushService.sendMessage({ action: 'forgot-password' });
  }

  register() {
    this.messagePushService.sendMessage({ action: 'register' });
  }

}
