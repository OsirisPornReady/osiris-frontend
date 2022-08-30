import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IconsProviderModule } from 'src/app/icons-provider.module';

registerLocaleData(zh);


import { SHARED_ZORRO_MODULES } from "./shared-zorro.module";

import { CriteriaBarComponent } from "./components/criteria-bar/criteria-bar.component";
import { MultiConditionSearchPageComponent } from "./components/multi-condition-search-page/multi-condition-search-page.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { VideoDetailComponent } from "./components/video-detail/video-detail.component";

import { AclIfDirective } from "../directive/acl-if.directive";




const COMPONENTS = [
  CriteriaBarComponent,
  MultiConditionSearchPageComponent,
  SearchBarComponent,
  UserInfoComponent,
  VideoDetailComponent,
];
const DIRECTIVES = [
  AclIfDirective,
];
const PIPES: any = [];
const ANIMATIONS: any = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...ANIMATIONS,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    IconsProviderModule,
    ...SHARED_ZORRO_MODULES,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  exports: [
    IconsProviderModule,
    ...SHARED_ZORRO_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...ANIMATIONS,
  ]
})
export class SharedModule { }
