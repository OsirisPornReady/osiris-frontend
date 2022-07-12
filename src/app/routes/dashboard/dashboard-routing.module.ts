import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {ThumbnailPageComponent} from "./thumbnail-page/thumbnail-page.component";
import {MultiConditionSearchPageComponent} from "./multi-condition-search-page/multi-condition-search-page.component";
import {WelcomeComponent} from "../welcome/welcome.component";

const routes: Routes = [
  { path:'',component:DashboardComponent,
    children: [
      { path:'thumbnail-page',component:ThumbnailPageComponent },
      { path:'multi-condition-search-page',component:MultiConditionSearchPageComponent },
      { path:'welcome',component:WelcomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
