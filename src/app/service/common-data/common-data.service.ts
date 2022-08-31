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

  async syncGlobalConfig() {
    try {
      const globalConfig:any = await this.httpClient.get('/ajax/projectSetting/getGlobalConfig').toPromise();
      this.debugMode = globalConfig.debugMode;
    } catch (e) {
      console.log('服务器无法连接,未获取到全局设置');
    }
  }
}
