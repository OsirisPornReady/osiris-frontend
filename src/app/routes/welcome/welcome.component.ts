import { Component, OnInit } from '@angular/core';
import { VideoService } from "../../service/video/video.service";
import {Video} from "../../models/video";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  show:boolean = true;

  constructor(
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    console.log('at welcome');
    console.log(this.videoService.videoList[1]);
  }

}
