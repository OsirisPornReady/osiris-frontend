import { Component, OnInit } from '@angular/core';
import { VideoService } from "../../../service/video/video.service";
import { Observable, Subject } from "rxjs";
import { NzModalService } from "ng-zorro-antd/modal";
import { VideoDetailComponent } from "../../../shared/components/video-detail/video-detail.component";


@Component({
  selector: 'dashboard-thumbnail-page',
  templateUrl: './thumbnail-page.component.html',
  styleUrls: ['./thumbnail-page.component.less']
})
export class ThumbnailPageComponent implements OnInit {

  videos:any[] = [
    {
      id:1,
      title:'Down Under',
      thumbnail:'https://i.ytimg.com/an/vHasKL0eXBI/5175587361185972866_mq.jpg?v=62063e99',
      author:'Luude',
    },
    {
      id:2,
      title:'Good Morning',
      thumbnail:'https://i1.sndcdn.com/artworks-dmdvj3sG4KOa-0-t240x240.jpg',
      author:'Kanye West',
    },
    {
      id:3,
      title:'Prey',
      thumbnail:'https://i.scdn.co/image/ab67616d0000b2734af0850c0294d875edbef276',
      author:'Mick Gordon',
    },
    {
      id:4,
      title:'Sad Machine',
      thumbnail:'https://i1.sndcdn.com/artworks-000108932407-u78n19-t500x500.jpg',
      author:'Porter Robinson',
    },
    {
      id:5,
      title:'Snow Crash',
      thumbnail:'https://i1.sndcdn.com/artworks-000086485288-ypack3-t500x500.jpg',
      author:'Mitch Murder',
    },
    {
      id:6,
      title:'Sakanaction',
      thumbnail:'https://upload.wikimedia.org/wikipedia/en/a/ab/Sakanaction_album_cover.jpg',
      author: 'サカナクション',
    }
  ];
  // isVisible:boolean = false;
  // selectedVideoId?:number;


  constructor(
    private videoService: VideoService,
    private modalService: NzModalService,
  ) { }

  getVideoList() {

  }

  ngOnInit(): void {
  }

  selectVideo(id:number) {
    // this.isVisible = true
    // this.selectedVideoId = id;
    console.log(id)

    this.modalService.create({
      nzContent:VideoDetailComponent,
      nzComponentParams: {
        selectedVideoId:id,
      },
      nzWidth:900,
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
