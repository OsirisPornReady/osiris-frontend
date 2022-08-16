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
      0,
      'Down Under',
      ['Luude','Colin'],
      '/assets/down under.jpg',
      ['D & B'],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      1,
      'Good Morning',
      ['Kanye West'],
      '/assets/Good morning.jpg',
      ["hip hop","rap"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      2,
      'Prey',
      ['Mick Gordon'],
      '/assets/prey.jpg',
      ["Game Theme"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      3,
      'Sad Machine',
      ['Porter Robinson'],
      '/assets/sad machine.jpg',
      ["vocaloid"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      4,
      'Snow Crash',
      ['Mitch Murder'],
      '/assets/snow crash.jpg',
      ["Retro"],
      '',
       new Date(2022,7,26),
    ),
    new Video(
      5,
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
    if (this.commonDataService.debugMode) {
      return true; //或者不那么麻烦直接空return就行,最后的值是一个undefined
    }

    try {
      let res:any = await this.http.get('/ajax/video/getAllVideo').toPromise();
      this.videoList = res;
      return true;
    } catch (e) {
      console.log('获取视频列表失败')
      console.log(e)
      return false;
    }

  }

  pushVideoList() {
    const videoListCopy = JSON.parse(JSON.stringify(this.videoList))
    this.videoListStream$.next(videoListCopy);
  }

  // getVideo <T>(index:T): Video {
  //   return this.videoList[index];
  // }

  //---------------本身逻辑闭环的情况下不需要加那么多情况判断,因为正常逻辑里不会出现越界值等问题,出现了就是出错了,直接在错误处理流程中处理就行
  private addVideo(value:any): boolean {
    try {
      const lastIndex = this.videoList.length;
      this.videoList[lastIndex] = value;
      this.pushVideoList();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private getVideo(id:number): Video | null {
    try {
      const video = this.videoList.find((v:any) => { //找到则返回值,未找到则返回undefined
        return v.id == id
      })
      if (video) {  //只在闭环逻辑里可以不加此判断,但是get方法在其他地方可能用到
        return Video.toVideo(  //TS中的类型检查只在编译时候起作用，运行时类型改变要自己写静态方法
          JSON.parse(JSON.stringify(video)) //与List中的源数据隔离
        );
      } else {
        return null;
      }
    } catch (e) { //防止转换成既定类型时出错
      console.log(e);
      return null;
    }
  }

  private setVideo(id:number,value:any): boolean { //也可以叫update
    // Object.assign(this.videoList[key],value);
    // console.log(<Video>(JSON.parse(JSON.stringify(value))))
    // this.videoList[key] = (JSON.parse(JSON.stringify(value)) as Video);

    // let temp = JSON.parse(JSON.stringify(value)); //新开堆栈,以防结构里有嵌套类型
    // for (let prop in this.videoList[index]) {
    //   this.videoList[index][prop] = temp[prop];
    // }
    // this.pushVideoList()

    try {
      let index = -1;
      this.videoList.find((v:any,i:number) => { //找到则返回值,未找到则返回undefined
        if (v.id == id) {
          index = i;
          return true;
        } else {
          return false;
        }
      })
      this.videoList[index] = Video.toVideo(value);
      this.pushVideoList();
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  private removeVideo(id:number): boolean { //delVideo
    try {
      let index = -1;
      this.videoList.find((v:any,i:number) => { //找到则返回值,未找到则返回undefined
        if (v.id == id) {
          index = i
          return true;
        } else {
          return false;
        }
      })
      this.videoList.splice(index,1);
      this.pushVideoList();
      return true;
    } catch (e) {
      console.log(e)
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
      newVideo.id = this.videoList.length
      newVideo.title = '#new video#';
      newVideo.stars = [];
      newVideo.thumbnail = '/assets/imageFallback.png';
      newVideo.tags = [];
      newVideo.path = '';
      newVideo.date = new Date();
      return this.addVideo(newVideo)
    }

    //发送增加请求
    try {
      const newVideo = new Video();
      newVideo.title = '#new video#';
      newVideo.stars = [];
      newVideo.thumbnail = '/assets/imageFallback.png';
      newVideo.tags = [];
      newVideo.path = '';
      newVideo.date = new Date();

      const data = JSON.stringify({
        video: newVideo,
      });
      let res:any = await this.http.post('/ajax/video/createVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      newVideo.id = res.id;
      this.addVideo(newVideo);
      console.log(`video(id:${res.id})视频新增成功`,res);
      return true;
    } catch (e) {
      console.log('新增视频失败');
      console.log(e);
      return false;
    }
  }

  retrieveVideo(id:number): Video | null { //大部分情况下都是从本地缓存拿数据,因为数据先是以列表形式展示,特殊情况才要重新发请求
    return this.getVideo(id);
  }

  async updateVideo(id:number,value:any) {
    //调试模式
    if (this.commonDataService.debugMode) {
      return this.setVideo(id,value);
    }

    //发送更新请求
    try {
      const data = JSON.stringify({
        id: id,
        video: value,
      });
      let res:any = await this.http.post('/ajax/video/updateVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      this.setVideo(id,value);
      console.log(`video(id:${id})视频信息修改成功`,res);
      return true;
    } catch (e) {
      console.log('更新视频信息失败');
      console.log(e);
      return false;
    }
  }

  async deleteVideo(id:number) {
    //调试模式
    if (this.commonDataService.debugMode) {
      return this.removeVideo(id)
    }

    //发送删除请求
    try {
      const data = JSON.stringify({
        id: id,
      });
      let res:any = await this.http.post('/ajax/video/deleteVideo',data,this.httpOptions).toPromise(); //出错后直接跳到catch,try中剩余代码不执行,要注意在server层中做status 500处理了才会是reject状态
      this.removeVideo(id);
      console.log(`video(id:${id})视频删除成功`,res);
      return true;
    } catch (e) {
      console.log('删除视频失败')
      console.log(e)
      return false;
    }

  }
//----------------------------------------------------------------------------------



}
