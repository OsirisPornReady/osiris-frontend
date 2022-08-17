import { Component, OnInit } from '@angular/core';
import { CommonDataService } from "./service/common-data/common-data.service";
import { UserService } from "./service/user/user.service";

// // @ts-ignore
// import * as debugConfig from '../../GlobalConfig.js' //能成功但是得加ts-ignore

// // @ts-ignore
// import { debugMode } from '../../GlobalConfig.js'

// @ts-ignore
import * as GlobalConfig from '../../GlobalConfig.js'

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
    this.commonDataService.debugMode = GlobalConfig.debugMode;

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


}
