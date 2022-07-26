import { Injectable } from '@angular/core';
import { Video } from "../../models/video";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videoList:any = [
    new Video(
      'Down Under',
      ['Luude','Colin'],
      '/assets/down under.jpg',
      ['D & B'],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      'Good Morning',
      ['Kanye West'],
      '/assets/Good morning.jpg',
      ["hip hop","rap"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      'Prey',
      ['Mick Gordon'],
      '/assets/prey.jpg',
      ["Game Theme"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      'Sad Machine',
      ['Porter Robinson'],
      '/assets/sad machine.jpg',
      ["vocaloid"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      'Snow Crash',
      ['Mitch Murder'],
      '/assets/snow crash.jpg',
      ["Retro"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      'Sakanaction',
      ['サカナクション',],
      '/assets/Sakanaction_album_cover.jpg',
      ["electro & rock"],
      '',
       new Date(2022,7,26),
    ),
  ];
  // videoSelected:number = -1;
  videoStream$:any = new Subject<any>();
  videoListStream$:any = new Subject<any>();


  constructor(
    private http: HttpClient
  ) { }

  getVideos(): Video[] {
    return this.videoList;
  }

  pushVideoList() {
    const videoListCopy = JSON.parse(JSON.stringify(this.videoList))
    this.videoListStream$.next(videoListCopy);
  }

  // getVideo <T>(index:T): Video {
  //   return this.videoList[index];
  // }

  getVideo(index:number): Video | null {
    if (index < this.videoList.length) {
      return this.videoList[index];
    } else {
      return null;
    }
  }

  setVideo(index:number,value:Video): void { //也可以叫update
    // Object.assign(this.videoList[key],value);
    // console.log(<Video>(JSON.parse(JSON.stringify(value))))
    // this.videoList[key] = (JSON.parse(JSON.stringify(value)) as Video);
    let temp = JSON.parse(JSON.stringify(value)); //新开堆栈,以防嵌套类型
    for (let prop in this.videoList[index]) {
      this.videoList[index][prop] = temp[prop];
    }
    this.pushVideoList()
  }

  pushVideo(index:number): void {
    try {
      // key:any
      // let nextValue:any
      // if (typeof key == "number") {
      //   // let nextValue:any = this.getVideo<number>(key) //不一定所有方法都有返回值,若无将赋值替换即可
      //   nextValue = this.getVideo<number>(key) //不一定所有方法都有返回值,若无将赋值替换即可
      // } else if (typeof key == "string") {
      //   nextValue = this.getVideo<string>(key) //不一定所有方法都有返回值,若无将赋值替换即可
      // }

      let nextValue:any;
      nextValue = this.getVideo(index)
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

  createVideo(): number {
    const lastIndex = this.videoList.length;
    this.videoList[lastIndex] = new Video();
    this.videoList[lastIndex].title = '#new video#';
    this.videoList[lastIndex].thumbnail = '/assets/imageFallback.png';
    this.pushVideoList();
    return lastIndex;
  }

  deleteVideo(index:number): boolean {
    if (index < this.videoList.length) {
      this.videoList.splice(index,1);
      this.pushVideoList();
      return true;
    } else {
      return false;
    }
  }



}
