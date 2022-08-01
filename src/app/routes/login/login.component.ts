import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { Router, ActivatedRoute} from "@angular/router";
import { UserService } from "../../service/user/user.service";
import {User} from "../../models/user";
import { NzMessageService } from "ng-zorro-antd/message";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      remember:[false],
    })

    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      const username = JSON.parse(lastUser).username;
      const password = JSON.parse(lastUser).password;
      this.loginForm.get('username')?.patchValue(username);
      this.loginForm.get('password')?.patchValue(password);
    }
  }

  async login() {
    this.isLoading = true
    const signInRes = await this.userService.signIn(this.loginForm.value)
    console.log(signInRes)
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
        this.nzMessageService.error('用户信息传输发生错误');
      }
      this.isLoading = false;
    }
  }



}
