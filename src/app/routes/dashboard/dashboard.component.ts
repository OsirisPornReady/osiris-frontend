import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../service/user/user.service";
import { Video } from "../../models/video";
import { VideoService } from "../../service/video/video.service";
import { Router, ActivatedRoute } from "@angular/router";
import {VideoDetailComponent} from "../../shared/components/video-detail/video-detail.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { CommonDataService } from "../../service/common-data/common-data.service";
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{

  isCollapsed = false;
  user!: User | null;
  // modalWidth:number = 1300;
  editThumbnail: boolean = false;
  // userMenuStyle:any = {
  //   'width': '500px'
  // }
  swapMethod:boolean = true;


  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private router: Router,
    private modalService: NzModalService,
    private commonDataService: CommonDataService,
    private drawerService: NzDrawerService,
  ) { }

  ngOnInit() {
    this.commonDataService.editThumbnail = this.editThumbnail; //this.switchQuickDelete(); 初始化的时候调整公共数据，并且要注意可读性
    this.user = this.userService.getCurrentUser();
  }

  addVideo() {
    const lastId = this.videoService.createVideo()

    // this.modalService.create({
    //   nzContent:VideoDetailComponent,
    //   nzComponentParams: {
    //     VideoId:lastId,
    //   },
    //   nzWidth:this.modalWidth,
    //   nzFooter:null,
    // })
  }

  switchEditThumbnail() {
    this.commonDataService.editThumbnail = this.editThumbnail;
  }

  switchSwapMethod() {
    this.commonDataService.swapMethod = this.swapMethod ? 'select' : 'drag';
  }

  openUserInfo() {
    const drawerRef = this.drawerService.create<UserInfoComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      // nzExtra: 'Extra', //12版本未存在此选项
      nzPlacement: 'right',
      nzWidth: 450,
      nzClosable: false,
      nzMaskClosable: true,
      nzKeyboard: true,
      nzContent: UserInfoComponent,
      nzContentParams: {
      }
    });

  }

  async signOut() {
    await this.userService.signOut();
    this.router.navigate(['/login'])
  }

  // manuallySetCdkOverlayContainer() {
  //   this.showUserMenu = true
  //   setTimeout(() => {
  //     let CdkOverlayContainer:any = document.getElementsByClassName('cdk-overlay-container')[0]
  //     console.log(CdkOverlayContainer.getElementsByClassName('user-menu')[0])
  //     let userMenu = CdkOverlayContainer.getElementsByClassName('user-menu')[0]
  //     userMenu.style.width = '500px'
  //   },100)
  // }
}
