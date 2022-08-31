import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDataService } from "../service/common-data/common-data.service";
import { UserService } from "../service/user/user.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class CoreModule { }
export function initAppDataFactory(commonDataService: CommonDataService,userService: UserService) {

  return async () => {

    await commonDataService.syncGlobalConfig()
    if (commonDataService.debugMode) {
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
      userService.setCurrentUser(user)
    }

    console.log('mode:',commonDataService.debugMode ? 'debug' : 'prod')
    console.log('user:',userService.getCurrentUser())

    console.log('good')
  };

}
