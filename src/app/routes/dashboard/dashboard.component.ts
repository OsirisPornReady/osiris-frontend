import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../service/user/user.service";
import { Video } from "../../models/video";
import { VideoService } from "../../service/video/video.service";
import { Router, ActivatedRoute } from "@angular/router";
import {VideoDetailComponent} from "../../shared/components/video-detail/video-detail.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { CommonDataService } from "../../service/common-data/common-data.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{

  isCollapsed = false;
  user!: User | null;
  // modalWidth:number = 1300;
  isQuickDelete: boolean = false;


  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private router: Router,
    private modalService: NzModalService,
    private commonDataService: CommonDataService,
  ) { }

  ngOnInit() {
    this.commonDataService.isQuickDelete = this.isQuickDelete; //this.switchQuickDelete(); 初始化的时候调整公共数据，并且要注意可读性
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

  switchQuickDelete() {
    this.commonDataService.isQuickDelete = this.isQuickDelete;
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/login'])
  }

}
