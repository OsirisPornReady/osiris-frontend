import { Component, OnInit } from '@angular/core';
import { CommonDataService } from "./service/common-data/common-data.service";
import { UserService } from "./service/user/user.service";

// // @ts-ignore
// import * as debugConfig from '../../GlobalConfig.js' //能成功但是得加ts-ignore

// // @ts-ignore
// import { debugMode } from '../../GlobalConfig.js'

// @ts-ignore
// import * as GlobalConfig from '../../GlobalConfig.js'

//感觉换成globalconfigts就能正常导入了

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(
    private commonDataService: CommonDataService,
    private userService: UserService,
  ) { }

  title = 'ng-zorro-test'
  isCollapsed = false;

  ngOnInit() {
    // this.commonDataService.debugMode = GlobalConfig.debugMode;

    // (async () => {   //直接在ngOnInit前加async的话会出问题,路由不会等待ngOnInit完成,而会直接跳转,等于函数暂停的功能没有发挥作用,这种写法还可以直接再定义一个函数
    //   await this.commonDataService.syncGlobalConfig();
    // });

    this.initGlobalConfig();

    if (this.commonDataService.debugMode) {
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

  }

  async initGlobalConfig() {
    await this.commonDataService.syncGlobalConfig();
  }


}
