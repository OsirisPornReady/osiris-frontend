import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(zh);

import { DashboardComponent } from "./dashboard.component";
import { ThumbnailPageComponent } from './thumbnail-page/thumbnail-page.component';
import { VideoDetailComponent } from '../../shared/components/video-detail/video-detail.component';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { CriteriaBarComponent } from "../../shared/components/criteria-bar/criteria-bar.component";
import { MultiConditionSearchPageComponent } from './multi-condition-search-page/multi-condition-search-page.component';

import { AclIfDirective } from "../../directive/acl-if.directive";

import {NzGridModule} from "ng-zorro-antd/grid";
import {NzModalModule} from "ng-zorro-antd/modal";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";



@NgModule({
  declarations: [
    DashboardComponent,
    ThumbnailPageComponent,
    VideoDetailComponent,
    SearchBarComponent,
    CriteriaBarComponent,
    MultiConditionSearchPageComponent,
    AclIfDirective,
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzModalModule,
    NzImageModule,
    NzTagModule,
    NzTableModule,
    NzSwitchModule,
    NzButtonModule,
    NzSpaceModule,
    NzInputModule,
    NzSelectModule,
    NzDividerModule,
    NzCardModule,
    NzFormModule,
    NzDatePickerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
