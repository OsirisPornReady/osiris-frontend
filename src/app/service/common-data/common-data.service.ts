import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  debugMode:boolean = true;
  editThumbnail:boolean = false;
  swapMethod:string = 'select';
  ws!: WebSocket;

  guardRedirects:any = {
    dashboard: '/login',
    dashboardLazyLoad: '/login',
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  async syncGlobalConfig(): Promise<any> {
    try {
      const devConfig:any = await this.httpClient.get('/ajax/globalConfig/getDevConfig').toPromise();
      this.debugMode = devConfig.debugMode;
      console.log('已获取配置')
    } catch (e) {
      console.log('服务器无法连接,未获取到全局设置,采用本地设置');
      this.debugMode = FrontConfig.debugMode;
    }
  }

}
