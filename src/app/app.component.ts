import { Component, OnInit } from '@angular/core';
import { CommonDataService } from "./service/common-data/common-data.service";
import { UserService } from "./service/user/user.service";

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
  debug:boolean = true

  ngOnInit() {
    this.commonDataService.debugMode = this.debug;

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
