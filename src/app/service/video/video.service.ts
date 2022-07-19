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
      ['Luude','Colin'],
      '/assets/down under.jpg',
      ['D & B'],
      '',
    ),
    2:new Video(
      'Good Morning',
      ['Kanye West'],
      '/assets/Good morning.jpg',
      ["hip hop","rap"],
      '',
    ),
    3:new Video(
      'Prey',
      ['Mick Gordon'],
      '/assets/prey.jpg',
      ["Game Theme"],
      ''
    ),
    4:new Video(
      'Sad Machine',
      ['Porter Robinson'],
      '/assets/sad machine.jpg',
      ["vocaloid"],
      '',
    ),
    5:new Video(
      'Snow Crash',
      ['Mitch Murder'],
      '/assets/snow crash.jpg',
      ["Retro"],
      ''
    ),
    6:new Video(
      'Sakanaction',
      ['サカナクション',],
      '/assets/Sakanaction_album_cover.jpg',
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

  getVideo <T>(key:T): Video {
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
      let nextValue:any
      if (typeof key == "number") {
        // let nextValue:any = this.getVideo<number>(key) //不一定所有方法都有返回值,若无将赋值替换即可
        nextValue = this.getVideo<number>(key) //不一定所有方法都有返回值,若无将赋值替换即可
      } else if (typeof key == "string") {
        nextValue = this.getVideo<string>(key) //不一定所有方法都有返回值,若无将赋值替换即可
      }
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
