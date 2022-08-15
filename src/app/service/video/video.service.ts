import {Injectable} from '@angular/core';
import {Video} from "../../models/video";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import { CommonDataService } from "../common-data/common-data.service";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  /*
  * 何时进行类型检查?
  *   在传入component之前,因为在component中要将数据和组件进行严格对应,所以传入组件的必须是Video类型
  */

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

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
    private http: HttpClient,
    private commonDataService: CommonDataService,
  ) { }

  async initVideoList() {
    let res:any = await this.http.get('/ajax/video/getAllVideo').toPromise();
    if (res) {
      this.videoList = res;
    }
  }

  pushVideoList() {
    const videoListCopy = JSON.parse(JSON.stringify(this.videoList))
    this.videoListStream$.next(videoListCopy);
  }

  // getVideo <T>(index:T): Video {
  //   return this.videoList[index];
  // }

  private addVideo(value:any): number {
    const lastIndex = this.videoList.length;
    // this.videoList[lastIndex] = new Video();
    // this.videoList[lastIndex].title = '#new video#';
    // this.videoList[lastIndex].thumbnail = '/assets/imageFallback.png';
    this.videoList[lastIndex] = value;
    this.pushVideoList();
    return lastIndex;
  }

  private getVideo(index:number): Video | null {
    if (index < this.videoList.length) {
      try {
        const video = Video.toVideo(  //TS中的类型检查只在编译时候起作用，运行时类型改变要自己写静态方法
          JSON.parse(JSON.stringify(this.videoList[index])) //与List中的源数据隔离
        );
        return video;
      } catch (e) { //防止转换成既定类型时出错
        console.log(e)
        return null
      }
    } else {
      return null;
    }
  }

  private setVideo(index:number,value:any): void { //也可以叫update
    // Object.assign(this.videoList[key],value);
    // console.log(<Video>(JSON.parse(JSON.stringify(value))))
    // this.videoList[key] = (JSON.parse(JSON.stringify(value)) as Video);

    // let temp = JSON.parse(JSON.stringify(value)); //新开堆栈,以防结构里有嵌套类型
    // for (let prop in this.videoList[index]) {
    //   this.videoList[index][prop] = temp[prop];
    // }
    // this.pushVideoList()

    try {
      this.videoList[index] = Video.toVideo(value);
      this.pushVideoList();
    } catch (e) {
      console.log(e)
    }
  }

  private removeVideo(index:number): boolean { //delVideo
    if (index < this.videoList.length) {
      this.videoList.splice(index,1);
      this.pushVideoList();
      return true;
    } else {
      return false;
    }
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


//--------------先请求，请求成功再改本地------------------------------------------------
  async createVideo() {
    //调试模式
    if (this.commonDataService.debugMode) {
      const newVideo = new Video();
      newVideo.title = '#new video#';
      newVideo.thumbnail = '/assets/imageFallback.png';
      this.addVideo(newVideo)
      return true;
    }

    //发送增加请求
    try {
      const newVideo = new Video();
      newVideo.title = '#new video#';
      newVideo.thumbnail = '/assets/imageFallback.png';

      const index = this.videoList.length

      const data = JSON.stringify({
        id: index,
        video: newVideo,
      });
      let res:any = await this.http.post('/ajax/video/createVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      console.log(`video(id:${index})视频新增成功`,res);
      this.addVideo(newVideo);
      return true;
    } catch (e) {
      console.log('新增视频失败');
      console.log(e);
      return false;
    }
  }

  retrieveVideo(index:number): Video | null { //大部分情况下都是从本地缓存拿数据,因为数据先是以列表形式展示,特殊情况才要重新发请求
    return this.getVideo(index);
  }

  async updateVideo(index:number,value:any) {
    //调试模式
    if (this.commonDataService.debugMode) {
      this.setVideo(index,value);
      return true;
    }

    //发送更新请求
    try {
      const data = JSON.stringify({
        id: index,
        video: value,
      });
      let res:any = await this.http.post('/ajax/video/updateVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      console.log(`video(id:${index})视频信息修改成功`,res);
      this.setVideo(index,value);
      return true;
    } catch (e) {
      console.log('更新视频信息失败');
      console.log(e);
      return false;
    }
  }

  async deleteVideo(index:number) {
    //调试模式
    if (this.commonDataService.debugMode) {
      this.removeVideo(index)
      return true;
    }

    //发送删除请求
    try {
      const data = JSON.stringify({
        id: index,
      });
      let res:any = await this.http.post('/ajax/video/deleteVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      console.log(`video(id:${index})视频删除成功`,res);
      this.removeVideo(index);
      return true;
    } catch (e) {
      console.log('删除视频失败')
      console.log(e)
      return false;
    }

  }
//----------------------------------------------------------------------------------



}
