import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { Router, ActivatedRoute} from "@angular/router";
import { UserService } from "../../service/user/user.service";
import {User} from "../../models/user";
import { NzMessageService } from "ng-zorro-antd/message";
import { MessagePushService } from "../../service/message-push/message-push.service";
import { Subscription } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";


@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.less']
})
export class AudioPlayerComponent implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild('audioElement', { static: false }) audioElement?:ElementRef;

  timestamp:number = 0;
  duration:number = 0;
  currentTime:number = 0;
  onSlide:boolean = false;

  constructor(

  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // @ts-ignore
    this.audioElement?.nativeElement.onloadedmetadata = () => {
      console.log(this.audioElement?.nativeElement.duration);
      this.duration = this.audioElement?.nativeElement.duration;
    }

    // @ts-ignore
    this.audioElement?.nativeElement.ontimeupdate = () => {
      // console.log(this.onSlide)
      if (!this.onSlide) {
        this.currentTime = this.audioElement?.nativeElement.currentTime;
      }
    }

  }

  ngOnDestroy() {

  }

  play() {
    this.audioElement?.nativeElement.play();
  }

  pause() {
    this.audioElement?.nativeElement.pause();
  }

  fastForward() {
    // @ts-ignore
    // this.audioElement?.nativeElement.currentTime = 20;
    console.log(this.audioElement?.nativeElement.currentTime)
  }

  startSlideProgressBar() {
    if (!this.onSlide) {
      this.onSlide = true
    }
  }

  slideProgressBar() {
    // @ts-ignore
    this.audioElement?.nativeElement.currentTime = this.currentTime;
    this.onSlide = false
  }
}
