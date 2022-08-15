import { Component, OnInit } from '@angular/core';
import { VideoService } from "./service/video/video.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(
    private videoService: VideoService,
  ) { }

  title = 'ng-zorro-test'
  isCollapsed = false;

  ngOnInit() {
    this.videoService.initVideoList();
  }
}
