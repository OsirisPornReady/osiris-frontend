import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { VideoService } from "../../../service/video/video.service";
import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NzModalService } from "ng-zorro-antd/modal";
import { VideoDetailComponent } from "../../../shared/components/video-detail/video-detail.component";
import { CommonDataService } from "../../../service/common-data/common-data.service";


@Component({
  selector: 'dashboard-thumbnail-page',
  templateUrl: './thumbnail-page.component.html',
  styleUrls: ['./thumbnail-page.component.less']
})
export class ThumbnailPageComponent implements OnInit,OnDestroy {

  @ViewChild('thumbnails', { static:true }) thumbnails?:ElementRef;
  @ViewChild('virtualScrollWrapper', { static:true }) virtualScrollWrapper?:ElementRef;

  videos:any[] = [];
  // set _videos(videos:any) { //videos每次变化都改变一次showItem过于麻烦，不如直接写setter
  //   this.videos = videos;
  //   this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
  // }
  videoListSubscription:any;
  modalWidth:number = 1300;
  // isVisible:boolean = false;
  // selectedVideoId?:number;
  // videos:any[] = [];
  get isQuickDelete() {
    return this.commonDataService.isQuickDelete;
  }



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
    private changeDetection: ChangeDetectorRef,
    private commonDataService: CommonDataService,
  ) { }

//angular7~8时就已经可以自动监测数组变化，不需要另外做处理
  public customTB(index:any, video:any) { return `${index}-${video.id}`; }

  getVideoList() {

  }


  async ngOnInit() { //不阻塞的话就直接返回本地测试数据了
    this.videoListSubscription = this.videoService.videoListStream$.subscribe(
      (next:any) => {
        // this._videos = next;
        // this.changeDetection.detectChanges();

        this.videos = next;
        console.log(this.videos)
        const videoNum = this.videos.length
        this.totalHeight = ( Math.floor(videoNum / this.rowNumber) + (videoNum % this.rowNumber > 0 ? 1 : 0) ) * this.itemHeight + 50 ; //考虑到占不满一行的情况下，当前videos能填满几行,增加尾部余量以防最后加载不出来
        this.showHeight = window.innerHeight - 64 - 24 * 2; //可以减也可以不减padding
        this.showNumber = Math.floor(this.showHeight / this.itemHeight) * this.rowNumber + this.rowNumber; //maxRow * rowNum + 上下边缘截取的余量
        this.renderer2.setStyle(this.virtualScrollWrapper?.nativeElement,'height',this.totalHeight + 'px'); //布置虚拟高度


        this.startIndex = 0
        this.endIndex = this.startIndex + this.showNumber;
        this.showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
      }
    )
    await this.videoService.initVideoList();
    this.videoService.pushVideoList();
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

  selectVideo(video:any) {
    console.log('select video index:',video.id)
    this.modalService.create({
      nzContent:VideoDetailComponent,
      nzComponentParams: {
        VideoId:video.id,
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

  quickDelete(e:any,video:any) {
    e.stopPropagation();
    this.videoService.deleteVideo(video.id);
  }

  ngOnDestroy() {
    this.videoListSubscription.unsubscribe();
  }





}
