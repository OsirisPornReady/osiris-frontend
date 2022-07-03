import { Injectable } from '@angular/core';
import { Video } from "../../models/video";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videoList:any = {
    1:new Video(
      'Down Under',
      ['Luude'],
      'https://i.ytimg.com/an/vHasKL0eXBI/5175587361185972866_mq.jpg?v=62063e99',
      ['D & B'],
      '',
    ),
    2:new Video(
      'Good Morning',
      ['Kanye West'],
      'https://i1.sndcdn.com/artworks-dmdvj3sG4KOa-0-t240x240.jpg',
      ["hip hop","rap"],
      '',
    ),
    3:new Video(
      'Prey',
      ['Mick Gordon'],
      'https://i.scdn.co/image/ab67616d0000b2734af0850c0294d875edbef276',
      ["Game Theme"],
      ''
    ),
    4:new Video(
      'Sad Machine',
      ['Porter Robinson'],
      'https://i1.sndcdn.com/artworks-000108932407-u78n19-t500x500.jpg',
      ["vocaloid"],
      '',
    ),
    5:new Video(
      'Snow Crash',
      ['Mitch Murder'],
      'https://i1.sndcdn.com/artworks-000086485288-ypack3-t500x500.jpg',
      ["Retro"],
      ''
    ),
    6:new Video(
      'Sakanaction',
      ['サカナクション',],
      'https://upload.wikimedia.org/wikipedia/en/a/ab/Sakanaction_album_cover.jpg',
      ["electro & rock"],
      ''
    ),
  };
  // videoSelected:number = -1;
  videoStream$:any = new Subject<any>();


  constructor(
    private http: HttpClient
  ) { }

  getVideos(): Video[] {
    return this.videoList;
  }

  getVideo(key:number): Video {
    return this.videoList[key];
  }

  setVideo(key:number,value:Video): void {
    // Object.assign(this.videoList[key],value);
    // console.log(<Video>(JSON.parse(JSON.stringify(value))))
    // this.videoList[key] = (JSON.parse(JSON.stringify(value)) as Video);
    let temp = JSON.parse(JSON.stringify(value)); //新开堆栈,以防嵌套类型
    for (let prop in this.videoList[key]) {
      this.videoList[key][prop] = temp[prop];
    }
  }

  pushVideo(key:any): void {
    try {
      let nextValue:any = this.getVideo(key) //不一定所有方法都有返回值,若无将赋值替换即可
      this.videoStream$.next(nextValue);
    } catch (error) {
      this.videoStream$.next(error);
    }

    // try {
    //   this.videoStream$.next(this.getVideo(key));
    // } catch (error) {
    //   this.videoStream$.error(error);
    // }
    //最好还是自己进行错误检查，访问不存在的键值会返回undefined，但并不报错，仍调用next
    //不要用error和complete，两者都会停止流传输
  }


}
