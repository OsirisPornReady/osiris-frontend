import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { Video } from "../../../models/video";
import { VideoService } from "../../../service/video/video.service";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";


@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.less']
})
export class VideoDetailComponent implements OnInit,OnDestroy {

  @Input() selectedVideoId!:number;

  @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;
  @ViewChild('starInputElement', { static: false }) starInputElement?: ElementRef;

  tagInputVisible = false;
  tagInputValue = '';
  tags:string[] = [];

  starInputVisible = false;
  starInputValue = '';
  stars:string[] = [];

  // video:Video = new Video();
  video!:Video;
  videoSubscription?:any;
  videoEditingForm!:FormGroup;

  editMode:boolean = false;
  loading:boolean = false;
  modified:boolean = false;


  constructor(
    private videoService: VideoService,
    private fb:FormBuilder,
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    console.log('init')
    // const videoObserver = {  //其实就是定义了一个处理推送信息的模式
    //   next: (v:any) =>{
    //     this.video = v;
    //     this.tags = v.tags;
    //     console.log(this.video)
    //   }
    // }
    // this.videoSubscription = this.videoService.videoStream$.subscribe(videoObserver)
    this.videoSubscription = this.videoService.videoStream$.subscribe(
      (next:any) => {  //调用error会中断流传输,所以必须为any,即使为错误也要用next()传回
        if (next instanceof Video) {
          // this.video = next; //深拷贝问题，在成型的前后端分离项目上问题不是很大，但在前端调试的时候(因为用的service中的假数据)如果直接对object赋值会产生将本地数据浅拷贝到service中的原数据上的问题
          // this.video = new Video(
          //   next.title,
          //   next.actor,
          //   next.thumbnail,
          //   next.tags,
          //   next.path,
          // )

          // this.video = new Video();
          // Object.assign(this.video,next);

          this.video = JSON.parse(JSON.stringify(next)); //将当前组件上的数据与service的数据隔离开
          this.stars = JSON.parse(JSON.stringify(this.video.stars)) //将动态表单的驱动数据与当前组件的数据隔离开。
          this.tags = JSON.parse(JSON.stringify(this.video.tags)) //将动态表单的驱动数据与当前组件的数据隔离开。
          console.log('视频信息:',this.video)
        }
      }
    )
    this.videoService.pushVideo(this.selectedVideoId);

    this.videoEditingForm = this.fb.group({  //复杂控件要自己实现一个model处理层，这里仅供简单的标识和非空校验
      title:[this.video.title,[Validators.required]],
      stars:[[],[Validators.required]],
      thumbnail:[this.video.thumbnail],
      tags:[[],[Validators.required]],  //似乎是只有对象属性才会拷贝引用地址,之前用this.video.tags直接拷贝了引用,但是用this.tags似乎是深拷贝
      path:[this.video.path],
    })
  }



// ▼-----------------------------------------tag处理-----------------------------------------------------------▼
  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  showTagInput(): void {
    this.tagInputVisible = true;
    setTimeout(() => {
      this.tagInputElement?.nativeElement.focus();
    }, 10);
  }

  handleTagInputConfirm(): void {
    if (this.tagInputValue && this.tags.indexOf(this.tagInputValue) === -1) {
      this.tags = [...this.tags, this.tagInputValue];
    }
    this.tagInputValue = '';
    this.tagInputVisible = false;
  }
// ▲-------------------------------------------------▲---------------------------------------------------------▲



// ▼-----------------------------------------star处理-----------------------------------------------------------▼
  sliceStarName(star: string): string {
    const isLongTag = star.length > 20;
    return isLongTag ? `${star.slice(0, 20)}...` : star;
  }

  showStarInput(): void {
    this.starInputVisible = true;
    setTimeout(() => {
      this.starInputElement?.nativeElement.focus();
    }, 10);
  }

  handleStarInputConfirm() {
    if (this.starInputValue && this.stars.indexOf(this.starInputValue) === -1) {
      this.stars = [...this.stars, this.starInputValue];
    }
    this.starInputValue = '';
    this.starInputVisible = false;
  }

  handleStarInputClose() {
    this.starInputValue = '';
    this.starInputVisible = false;
  }

  removeStar(index:number) {
    this.stars.splice(index,1);
  }
// ▲-------------------------------------------------▲---------------------------------------------------------▲



  ngOnDestroy(): void {
    console.log('哈,已上天堂了')
    this.videoSubscription.unsubscribe();
  }

  switchEdit(): void {
    this.stars = JSON.parse(JSON.stringify(this.video.stars))
    this.tags = JSON.parse(JSON.stringify(this.video.tags))
    if (this.editMode) { //这个if主要是为了节省资源，不写也行
      // for (const i in this.videoEditingForm.controls) {
      //   this.videoEditingForm.controls[i].patchValue(this.video[i as keyof Video])
      // }
      //两种写法均可,但填装字段时最好以数据源为准,form可能有些额外字段用于校验
      for (const i in this.video) {
        this.videoEditingForm.get(i)?.patchValue(this.video[i as keyof Video]);
      }
    }
  }

  patValueAndValidateStars(): void {
    this.videoEditingForm.get('stars')?.patchValue(this.stars);
    if (this.video.stars.length !== this.stars.length) {
      this.videoEditingForm.get('stars')?.markAsDirty();
    } else {
      for (let i=0; i < this.stars.length; i++) {
        if (this.video.stars[i] !== this.stars[i]) {
          this.videoEditingForm.get('stars')?.markAsDirty();
          break; //return也行
        }
      }
    }
  }

  patValueAndValidateTags(): void {
    this.videoEditingForm.get('tags')?.patchValue(this.tags);
    if (this.video.tags.length !== this.tags.length) {
      this.videoEditingForm.get('tags')?.markAsDirty();
    } else {
      for (let i=0; i < this.tags.length; i++) {
        if (this.video.tags[i] !== this.tags[i]) {
          this.videoEditingForm.get('tags')?.markAsDirty();
          break; //return也行
        }
      }
    }
  }

  saveEditedForm(): void {
    //绑定到input这类简单输入组件的数据如title等可以自动校验(隐式校验)，但复杂类型的数据如actor、tags等最好手动控制校验
    this.patValueAndValidateStars()
    this.patValueAndValidateTags()
    for (const i in this.videoEditingForm.controls) {
      this.videoEditingForm.controls[i].updateValueAndValidity();
    }

    if (this.videoEditingForm.valid) {
      // this.video.title = this.videoEditingForm.value.title;
      // this.video.actor[0] = this.videoEditingForm.value.actor;
      // Object.assign(this.video,this.videoEditingForm.value);
      this.video = JSON.parse(JSON.stringify(this.videoEditingForm.value)); //这里的video就起到interface的作用了，只验证属性类型
      console.log('保存表单:',this.videoEditingForm)
      this.editMode = false;
      if (this.videoEditingForm.dirty) {
        this.modified = true;
      } else {
        this.modified = false;
      }
    } else {
      for (const i in this.videoEditingForm.controls) {
        this.videoEditingForm.controls[i].markAsTouched();
        this.videoEditingForm.controls[i].updateValueAndValidity();
      }
    }
  }

  applyChange(): void {
    this.videoService.setVideo(this.selectedVideoId,this.video);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.modalRef.destroy();
    },300)
    // this.modalRef.destroy();
  }

  goBack(): void {
    this.modalRef.destroy();
  }

}
