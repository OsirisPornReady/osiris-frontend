import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { VideoService } from "../../../service/video/video.service";
import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NzModalService } from "ng-zorro-antd/modal";
import { VideoDetailComponent } from "../../../shared/components/video-detail/video-detail.componentOLD";



@Component({
  selector: 'dashboard-thumbnail-page',
  templateUrl: './thumbnail-page.component.html',
  styleUrls: ['./thumbnail-page.component.less']
})
export class ThumbnailPageComponent implements OnInit {

  @ViewChild('thumbnails', { static:true }) thumbnails?:ElementRef;
  @ViewChild('virtualScrollWrapper', { static:true }) virtualScrollWrapper?:ElementRef;

  videos:any[] = [
    {
      id:1,
      title:'Down Under',
      thumbnail:'/assets/down under.jpg',
      author:'Luude',
    },
    {
      id:2,
      title:'Good Morning',
      thumbnail:'/assets/Good morning.jpg',
      author:'Kanye West',
    },
    {
      id:3,
      title:'Prey',
      thumbnail:'/assets/prey.jpg',
      author:'Mick Gordon',
    },
    {
      id:4,
      title:'Sad Machine',
      thumbnail:'/assets/sad machine.jpg',
      author:'Porter Robinson',
    },
    {
      id:5,
      title:'Snow Crash',
      thumbnail:'/assets/snow crash.jpg',
      author:'Mitch Murder',
    },
    {
      id:6,
      title:'Sakanaction',
      thumbnail:'/assets/Sakanaction_album_cover.jpg',
      author: 'サカナクション',
    }
  ];
  modalWidth:number = 1300;
  // isVisible:boolean = false;
  // selectedVideoId?:number;
  // videos:any[] = [];



//--------------------------------虚拟滚动相关-----------------------------------------
  rowNumber = 8; //单行元素数
  itemHeight:number = 186; //单个元素的高度
  showHeight!:number; //可见区域的高度
  showNumber!:number; //可见区域能容纳的元素最大数量
  showItem:any[] = []; //容纳当前可见元素
  startIndex!:number; //虚拟窗口头索引
  endIndex!:number; //虚拟窗口尾索引
  totalHeight!:number; //总高度
  lastTime:any = new Date().getTime();
//--------------------------------虚拟滚动相关-----------------------------------------


  constructor(
    private videoService: VideoService,
    private modalService: NzModalService,
    private renderer2: Renderer2,
  ) { }

  getVideoList() {

  }

  ngOnInit(): void {

    const videoNum = this.videos.length
    this.totalHeight = ( Math.floor(videoNum / this.rowNumber) + (videoNum % this.rowNumber > 0 ? 1 : 0) ) * this.itemHeight + 50 ; //考虑到占不满一行的情况下，当前videos能填满几行,增加尾部余量以防最后加载不出来
    this.showHeight = window.innerHeight - 64 - 24 * 2; //可以减也可以不减padding
    this.showNumber = Math.floor(this.showHeight / this.itemHeight) * this.rowNumber + this.rowNumber; //maxRow * rowNum + 上下边缘截取的余量
    this.renderer2.setStyle(this.virtualScrollWrapper?.nativeElement,'height',this.totalHeight + 'px'); //布置虚拟高度


    this.startIndex = 0
    this.endIndex = this.startIndex + this.showNumber;
    this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
  }

  onScroll(e?:any) {
    if (!e) {
      return;
    }

    if (new Date().getTime() - this.lastTime > 15) {  //简易节流实现
      console.log('top',e.target.scrollTop);
      // const offsetY = Math.floor(e.target.scrollTop / this.itemHeight) * this.itemHeight;
      const offsetY = e.target.scrollTop - (e.target.scrollTop % this.itemHeight); //安全一点的写法，尽量避免浮点数
      this.renderer2.setStyle(this.thumbnails?.nativeElement,'transform',`translateY(${offsetY}px)`); //转移是必要的
      this.startIndex = Math.floor(e.target.scrollTop / this.itemHeight) * this.rowNumber; //完全翻越元素才更新
      this.endIndex = this.startIndex + this.showNumber;
      this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];

      this.lastTime = new Date().getTime();
    }



    // if (new Date().getTime() - this.lastTime > 50) { //防抖处理
    //   this.startIndex = Math.floor(e.target.scrollTop / this.itemHeight) * this.rowNumber; //floor即完全翻越元素才更新
    //   this.endIndex = this.startIndex + this.showNumber;
    //   this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
    //
    //   // if (this.startIndex + this.showNumber < this.videos.length) { //防止越界
    //   //   this.endIndex = this.startIndex + this.showNumber; //slice()包含start不包含end
    //   //   this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
    //   // } else {
    //   //   // this.endIndex = -1;
    //   //   this.showItem = [...this.videos.slice(this.startIndex)]; //slice()包含start不包含end
    //   // }
    //   // //slice()有自带的越界处理机制,可以直接slice(start,end)
    //
    // }
    // this.lastTime = new Date().getTime();


    // 1、this.startIndex + this.showNumber < this.videos.length //取this.endIndex = this.startIndex + this.showNumber;
    // 2、this.startIndex + this.showNumber = this.videos.length //全取
    // 3、this.startIndex + this.showNumber > this.videos.length //全取
  }

  selectVideo(id:number) {
    const test = [1,2,3]
    console.log(test.slice(0,6))
    // this.isVisible = true
    // this.selectedVideoId = id;
    console.log(id)

    this.modalService.create({
      nzContent:VideoDetailComponent,
      nzComponentParams: {
        selectedVideoId:id,
      },
      nzWidth:this.modalWidth,
      nzFooter:null,
    })
  }

  // handleOk() {
  //   this.isVisible = false;
  // }
  //
  // handleCancel() {
  //   this.isVisible = false;
  // }

}
