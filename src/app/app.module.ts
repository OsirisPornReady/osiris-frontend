import { NgModule, APP_INITIALIZER } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule, initAppDataFactory } from "./core/core.module";
import { CommonDataService } from "./service/common-data/common-data.service";
import { UserService } from "./service/user/user.service";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },
    {
      provide: APP_INITIALIZER,
      useFactory: initAppDataFactory,
      deps:[CommonDataService,UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
