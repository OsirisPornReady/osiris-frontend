import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

import { HighlightDirective } from "../../directive/highlight.directive";
import { MyshowDirective } from "../../directive/myshow.directive";


@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
  ],
  declarations: [
    WelcomeComponent,
    HighlightDirective,
    MyshowDirective,
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
