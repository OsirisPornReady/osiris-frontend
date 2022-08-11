import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import { AudioPlayerRoutingModule } from './audio-player-routing.module';

import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzIconModule } from "ng-zorro-antd/icon";

import { AudioPlayerComponent } from "./audio-player.component";



@NgModule({
  declarations: [
    AudioPlayerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AudioPlayerRoutingModule,
    NzSliderModule,
    NzIconModule,
  ]
})
export class AudioPlayerModule { }
