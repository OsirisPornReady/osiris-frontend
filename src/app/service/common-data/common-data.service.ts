import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user/user.service";

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
    private userService: UserService,
  ) { }

  async syncGlobalConfig() {
    try {
      const devConfig:any = await this.httpClient.get('/ajax/globalConfig/getDevConfig').toPromise();
      this.debugMode = devConfig.debugMode;
      if (this.debugMode) {
        const user = {
          "username":"admin",
          "password":"123456",
          "authority":{
            "create":true,
            "retrieve":true,
            "update":true,
            "delete":true
          },
          "messageCount": 10
        }
        this.userService.setCurrentUser(user)
      }
    } catch (e) {
      console.log('服务器无法连接,未获取到全局设置');
    }
  }
}
