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
  get editThumbnail() {
    if (!this.commonDataService.editThumbnail) {
      this.videoSwapBuffer = [];
      this.selectedVideoCard = {};
    }
    return this.commonDataService.editThumbnail;
  }
  get swapMethod() {
    if (this.commonDataService.swapMethod !== 'select') {
      this.videoSwapBuffer = [];
      this.selectedVideoCard = {};
    }
    return this.commonDataService.swapMethod;
  }
  videoSwapBuffer:any[] = [];
  selectedVideoCard:any = {};



//--------------------------------虚拟滚动相关-----------------------------------------
  rowNumber = 8; //单行元素数
  itemHeight:number = 243; //单个元素的高度 186  一定要选紧贴边缘的元素高度,这是变化的分界线,大于或小于实际元素都会有问题
  showHeight!:number; //可见区域的高度
  showNumber!:number; //可见区域能容纳的元素最大数量
  showItem:any[] = []; //容纳当前可见元素
  startIndex!:number; //虚拟窗口头索引
  endIndex!:number; //虚拟窗口尾索引
  totalHeight!:number; //总高度
  lastTime:any = new Date().getTime();
  currentScrollTop:number = 0; //用来在改动表数据时保持scrollTop不变
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

  // ngOnInit() {   //将ngOnInit声明为async,在其中await并没有什么用,程序并不会wait它,用这种方式才会wait
  //   this.Init().then(...);
  // }


  // 实验方法及结果：连接后台数据库的情况下去掉async/await,直接返回本地数据(没有等this.videoService.initVideoList()中的请求返回值就this.videoService.pushVideoList()了)
  // 加了async/await进行阻塞,直到服务器返回数据才this.videoService.pushVideoList()
  // 合理怀疑其实在ngOnInit之前加async本来就是有效的,甚至不用加类型,app中是因为涉及到了初始化和路由跳转所以情况特殊

  //ngOnInit在声明类型为Promise<void>后async是有用的
  async ngOnInit(): Promise<void> { //不阻塞的话就直接返回本地测试数据了
    this.videoListSubscription = this.videoService.videoListStream$.subscribe(
      (next:any) => {
        // this._videos = next;
        // this.changeDetection.detectChanges();

        this.videos = next;
        console.log(this.videos)
        const videoNum = this.videos.length
        this.totalHeight = ( Math.floor(videoNum / this.rowNumber) + (videoNum % this.rowNumber > 0 ? 1 : 0) ) * this.itemHeight + 30; //考虑到占不满一行的情况下，当前videos能填满几行,增加尾部余量以防最后加载不出来
        this.showHeight = window.innerHeight - 64 - 24 * 2; //可以减也可以不减padding
        this.showNumber = Math.floor(this.showHeight / this.itemHeight) * this.rowNumber + this.rowNumber; //maxRow * rowNum + 上下边缘截取的余量
        this.renderer2.setStyle(this.virtualScrollWrapper?.nativeElement,'height',this.totalHeight + 'px'); //布置虚拟高度


        this.startIndex = 0
        this.endIndex = this.startIndex + this.showNumber;
        this.setScrollTop(this.currentScrollTop);
        this.updateShowItem();

      }
    )
    await this.videoService.initVideoList();
    this.videoService.pushVideoList();
  }


  setScrollTop(scrollTop: number) {  //增删视频的时候保持滚动条位置不变,主要是增,减的时候会自动触发onscroll事件
    const offsetY = scrollTop - (scrollTop % this.itemHeight); //安全一点的写法，尽量避免浮点数
    this.renderer2.setStyle(this.thumbnails?.nativeElement,'transform',`translateY(${offsetY}px)`); //转移是必要的
    this.startIndex = Math.floor(scrollTop / this.itemHeight) * this.rowNumber; //完全翻越元素才更新
    this.endIndex = this.startIndex + this.showNumber;
  }


  onScroll(e?:any) {
    if (!e) {
      return;
    }

    this.currentScrollTop = e.target.scrollTop;

    if (new Date().getTime() - this.lastTime > 15) {  //简易节流实现
      console.log('top',e.target.scrollTop);
      // const offsetY = Math.floor(e.target.scrollTop / this.itemHeight) * this.itemHeight;
      const offsetY = e.target.scrollTop - (e.target.scrollTop % this.itemHeight); //安全一点的写法，尽量避免浮点数 0 mod any = 0
      this.renderer2.setStyle(this.thumbnails?.nativeElement,'transform',`translateY(${offsetY}px)`); //转移是必要的
      this.startIndex = Math.floor(e.target.scrollTop / this.itemHeight) * this.rowNumber; //完全翻越元素才更新
      this.endIndex = this.startIndex + this.showNumber;
      this.updateShowItem()

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

  //引发updateShowItem()的应该有两种事件:
  // 1.scroll,此时startIndex和endIndex变化,故窗口要重新绘制
  // 2.this.videos内容发生改变,故窗口要重新绘制,此处还有另一个问题忽略了:内容可以增删改查,故窗口大小和位置也有可能改变,就算窗口不变,virtualScroll也会变
  updateShowItem() {  //该函数只涉及thumbnail grid的内容改变,不改变位置等信息
    const showItem = [...this.videos.slice(this.startIndex,this.endIndex)];
    const rowNum = Math.floor(showItem.length / 8);
    const restDataNum = showItem.length % 8;
    const newArray = [];
    for (let i=0;i < rowNum;i++) {
      newArray.push(showItem.slice(i * 8, i * 8 + 8));
    }
    if (restDataNum > 0) {
      newArray.push(showItem.slice(rowNum * 8, rowNum * 8 + restDataNum));
    }
    this.showItem = newArray;
  }


  clickVideo(event:any,video:any) {
    if (this.editThumbnail) {
      if (this.swapMethod === 'select') {
        this.selectVideo(event,video);
      }
    } else {
      this.editVideo(video);
    }
  }


  selectVideo(event:any,video:any) {
    this.selectedVideoCard[video.id] = true;

    if (this.videoSwapBuffer.length >=0 && this.videoSwapBuffer.length < 2) {
      this.videoSwapBuffer.push(video);
    }

    if (this.videoSwapBuffer.length === 2) {
      setTimeout(() => {
        this.swapVideo();
      },300);
    }
  }


  async swapVideo() {
    const cVideo = this.videoSwapBuffer[1];
    const pVideo = this.videoSwapBuffer[0];

    let cIndex:number = -1;
    let pIndex:number = -1;

    this.videos.find((v:any,i:number) => {
      if (v.id == cVideo.id) {
        cIndex = i;
        return true;
      } else {
        return false;
      }
    })

    this.videos.find((v:any,i:number) => {
      if (v.id == pVideo.id) {
        pIndex = i;
        return true;
      } else {
        return false;
      }
    })

    try {
      await this.videoService.swapVideoOrder(this.videos[pIndex].id, pIndex, this.videos[cIndex].id, cIndex)
      // let temp = this.videos[pIndex];
      // this.videos[pIndex] = this.videos[cIndex];
      // this.videos[cIndex] = temp;
      this.videoSwapBuffer = [];
      // this.updateShowItem();
      this.selectedVideoCard = {};

      console.log('交换成功')
    } catch (e) {
      console.log('交换失败')
    }
  }


  editVideo(video:any) {
    if (this.editThumbnail) { return; } //修改thumbnail的时候不弹出
    console.log('select video index:',video.id);
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

  async quickDelete(e:any,video:any) {
    try {
      e.stopPropagation();
      // if (video.id === this.videoSwapBuffer[0].id) { //|| this.videoSwapBuffer[1].id == video.id 只用检查一个,如果有两个早换了,也不用foreach什么的
      //   this.videoSwapBuffer = []; //比pop安全
      // }
      //忽略了数组为空的情况
      this.videoSwapBuffer.forEach(v => {
        if (video.id === v.id) {
          this.videoSwapBuffer = []; //比pop安全
        }
      })
      await this.videoService.deleteVideo(video.id);
    } catch (e) {
      console.log('删除video失败',e);
    }
  }


  ngOnDestroy() {
    this.videoListSubscription.unsubscribe();
  }


  dragdropVideo(event:any, row:any, index:number) {
    console.log(event)
    console.log(index)
    this.moveItemInArray(row, index, event.previousIndex, event.currentIndex, event.previousContainer, event.container)
  }


  async moveItemInArray(row:any, index:number, previousIndex: number, currentIndex: number, PreviousContainer:any, Container:any) {
    if (PreviousContainer === Container) {
      let pIndex:number = -1;
      let cIndex:number = -1;

      this.videos.find((v:any,i:number) => {
        if (v.id == row[previousIndex].id) {
          pIndex = i;
          return true;
        } else {
          return false;
        }
      })

      this.videos.find((v:any,i:number) => {
        if (v.id == row[currentIndex].id) {
          cIndex = i;
          return true;
        } else {
          return false;
        }
      })


      try {
        await this.videoService.swapVideoOrder(this.videos[pIndex].id, pIndex, this.videos[cIndex].id, cIndex)
        // let temp = this.videos[pIndex];
        // this.videos[pIndex] = this.videos[cIndex];
        // this.videos[cIndex] = temp;
        // [this.videos[pIndex], this.videos[cIndex]] = [this.videos[cIndex], this.videos[pIndex]];
        console.log('交换成功')
      } catch (e) {
        console.log('交换失败')
      }
    } else {
      console.log('haha')
      const cRow = this.showItem[index];
      const re = parseInt(PreviousContainer.id.replace('cdk-drop-list-','')) - parseInt(Container.id.replace('cdk-drop-list-',''));
      const pRow = this.showItem[index + re];
      console.log('cRow',cRow)
      console.log('pRow',pRow)


      let cIndex:number = -1;
      let pIndex:number = -1;

      this.videos.find((v:any,i:number) => {
        if (v.id == cRow[currentIndex].id) {
          cIndex = i;
          return true;
        } else {
          return false;
        }
      })

      this.videos.find((v:any,i:number) => {
        if (v.id == pRow[previousIndex].id) {
          pIndex = i;
          return true;
        } else {
          return false;
        }
      })


      try {
        await this.videoService.swapVideoOrder(this.videos[pIndex].id, pIndex, this.videos[cIndex].id, cIndex)
        // let temp = this.videos[pIndex];
        // this.videos[pIndex] = this.videos[cIndex];
        // this.videos[cIndex] = temp;

        console.log('交换成功')
      } catch (e) {
        console.log('交换失败')
      }
    }
    this.updateShowItem();
  }

}
