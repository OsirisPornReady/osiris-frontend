import { Component, OnInit, OnDestroy, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Video } from "../../../models/video";
import { VideoService } from "../../../service/video/video.service";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";
// import { AclIfDirective } from "../../../directive/acl-if.directive";
import { LinkValidator } from "../../validators/link.validator";
import { TagValidator } from "../../validators/tag.validator";
import { ArrayDataTypeValidator } from "../../validators/arrayDataType.validator";
import {filter} from "rxjs/operators";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.less'],
  // viewProviders: [AclIfDirective],
})
export class VideoDetailComponent implements OnInit,OnDestroy,AfterViewInit {

  @Input() VideoId!:number;

  // @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;
  // @ViewChild('starInputElement', { static: false }) starInputElement?: ElementRef;

  @ViewChild('starInputElement', { static: false }) set starInputElement(starInputElement:ElementRef) {
    this.arrayTypeDataInputElementDict['stars'] = starInputElement;
  };

  @ViewChild('tagInputElement', { static: false }) set tagInputElement(tagInputElement:ElementRef) {
    this.arrayTypeDataInputElementDict['tags'] = tagInputElement;
  };

  tagInputVisible = false;
  tagInputValue = '';
  tags:string[] = [];

  starInputVisible = false;
  starInputValue = '';
  stars:string[] = [];


  arrayTypeDataInputElementDict:any = {};
  arrayTypeDataInputVisibleDict:any = {};
  arrayTypeDataInputValueDict:any = {};
  arrayTypeDataDict:any = {};


  // video:Video = new Video();
  video!:Video;
  videoSubscription?:any;
  videoEditingForm!:FormGroup;
  videoNotFound:boolean = false;


  isImageFold:boolean = false;
  editMode:boolean = false;
  loading:boolean = false;
  modified:boolean = false;
  thumbnailWidth = "60%";
  // // 750px
  dateFormat = 'yyyy/MM/dd';


  constructor(
    private videoService: VideoService,
    private fb:FormBuilder,
    private modalRef: NzModalRef,
  ) { }


  ngOnInit(): void {
    console.log('init');
    // this.videoSubscription = this.videoService.videoStream$.subscribe(
    //   (next:any) => {  //调用error会中断流传输,所以必须为any,即使为错误也要用next()传回
    //     if (next instanceof Video) {
    //       // this.video = next; //深拷贝问题，在成型的前后端分离项目上问题不是很大，但在前端调试的时候(因为用的service中的假数据)如果直接对object赋值会产生将本地数据浅拷贝到service中的原数据上的问题
    //       this.video = JSON.parse(JSON.stringify(next)); //将当前组件上的数据与service的数据隔离开
    //       for (let field in this.video) { //复杂数据类型的中间层
    //         if (this.video[field as keyof Video] instanceof Array) {
    //           this.arrayTypeDataInputVisibleDict[field] = false;
    //           this.arrayTypeDataInputValueDict[field] = ''
    //           this.arrayTypeDataDict[field] = JSON.parse(JSON.stringify(this.video[field as keyof Video]));
    //         }
    //       }
    //       console.log('视频信息:',this.video)
    //     }
    //   }
    // )
    // this.videoService.pushVideo(this.VideoId);

    let next: Video | null = this.videoService.retrieveVideo(this.VideoId);
    if (next) { //初始化当前video的值
      this.video = next
    } else {
      this.videoNotFound = true;
      return;
    }

    //初始化复杂类型容器
    for (let field in this.video) { //复杂数据类型的中间层
      if (this.video[field as keyof Video] instanceof Array) {
        this.arrayTypeDataInputVisibleDict[field] = false;
        this.arrayTypeDataInputValueDict[field] = ''
        this.arrayTypeDataDict[field] = JSON.parse(JSON.stringify(this.video[field as keyof Video]));
      }
    }
    console.log('视频信息:',this.video)

    //初始化响应式表单控件
    this.videoEditingForm = this.fb.group({  //复杂控件要自己实现一个model处理层，这里仅供简单的标识和非空校验
      title:[this.video.title,[Validators.required]],
      stars:[[]],
      thumbnail:[this.video.thumbnail],
      tags:[[]],  //似乎是只有对象属性才会拷贝引用地址,之前用this.video.tags直接拷贝了引用,但是用this.tags似乎是深拷贝
      path:[this.video.path],
      date:[this.video.date],
    })


  }


  ngAfterViewInit() {
    // console.log(this.starInputElement)
    // this.arrayTypeDataInputElementDict['stars'] = this.starInputElement;
    // this.arrayTypeDataInputElementDict['tags'] = this.tagInputElement;
  }


// ▼-----------------------------------------数组型数据通用式处理函数----------------------------------------------▼
  sliceDataName(data: string): string {  //tag和link通用
    const isLongData = data.length > 20;
    return isLongData ? `${data.slice(0, 20)}...` : data;
  }

  handleTagClose(field:string,removedTag: {}): void { //tag专用
    this.arrayTypeDataDict[field] = this.arrayTypeDataDict[field].filter((tag:string) => tag !== removedTag);
  }

  showDataInput(field:string): void { //tag和link通用
    this.arrayTypeDataInputVisibleDict[field] = true;
    setTimeout(() => {
      this.arrayTypeDataInputElementDict[field]?.nativeElement.focus();
    }, 10);
  }

  handleDataInputConfirm(field:string): void { //tag和link通用
    if (this.arrayTypeDataInputValueDict[field] && this.arrayTypeDataDict[field].indexOf(this.arrayTypeDataInputValueDict[field]) === -1) {
      this.arrayTypeDataDict[field] = [...this.arrayTypeDataDict[field], this.arrayTypeDataInputValueDict[field]];
    }
    this.arrayTypeDataInputValueDict[field] = '';
    this.arrayTypeDataInputVisibleDict[field] = false;
  }

  handleLinkInputClose(field:string) { //link专用
    this.arrayTypeDataInputValueDict[field] = '';
    this.arrayTypeDataInputVisibleDict[field] = false;
  }

  removeLink(field:string,index:number) { //link专用
    this.arrayTypeDataDict[field].splice(index,1);
  }
// ▲-------------------------------------------------▲---------------------------------------------------------▲
//                                                    |
//                                                    |
//                                                    |
//                                                    |
// ▼-----------------------------------------数组型数据通用式修改函数-----------------------------------------------▼
  patchArrayTypeData(): void {
    for (let field in this.arrayTypeDataDict) {
      this.videoEditingForm.get(field)?.patchValue(this.arrayTypeDataDict[field]);
    }
  }
// ▲-------------------------------------------------▲---------------------------------------------------------▲



  ngOnDestroy(): void {
    console.log('哈,已上天堂了')
    // this.videoSubscription.unsubscribe();
  }


  switchEdit(): void {
    // this.stars = JSON.parse(JSON.stringify(this.video.stars))
    // this.tags = JSON.parse(JSON.stringify(this.video.tags))
    for (let field in this.arrayTypeDataDict) { //不遍历video而是arrayTypeDataDict为了节省资源
      this.arrayTypeDataDict[field] = JSON.parse(JSON.stringify(this.video[field as keyof Video]));
    }

    if (this.editMode) { //这个if主要是为了节省资源(少更新一次普通类型的数据)，不写也行
      // for (const i in this.videoEditingForm.controls) {
      //   this.videoEditingForm.controls[i].patchValue(this.video[i as keyof Video])
      // }
      //两种写法均可,但填装字段时最好以数据源为准,form可能有些额外字段用于校验
      for (const i in this.video) {
        this.videoEditingForm.get(i)?.patchValue(this.video[i as keyof Video]);
      }
    }
  }


  foldImage() {
    this.isImageFold = !this.isImageFold;
  }


  saveEditedForm(): void {
    //绑定到input这类简单输入组件的数据如title等可以自动校验(隐式校验)，但复杂类型的数据如actor、tags等最好手动控制校验
    this.patchArrayTypeData();
    for (const field in this.arrayTypeDataDict) {
      const control = this.videoEditingForm.get(field)!
      control.setValidators([
        Validators.required,
        ArrayDataTypeValidator(this.video[field as keyof Video]),
      ])
      control.updateValueAndValidity();
    }

    if (this.videoEditingForm.valid) {
      this.video = JSON.parse(JSON.stringify(this.videoEditingForm.value)); //这里的video就起到interface的作用了，只验证属性类型
      console.log('保存表单:',this.videoEditingForm)
      this.editMode = false;
      if (this.videoEditingForm.dirty) {
        this.modified = true;
      } else {
        this.modified = false;
      }
    }
    // else {
    //   for (const i in this.videoEditingForm.controls) {
    //     this.videoEditingForm.controls[i].markAsTouched();
    //     this.videoEditingForm.controls[i].updateValueAndValidity();
    //   }
    // }
  }


  delete() {
    this.videoService.deleteVideo(this.VideoId);
    this.modalRef.destroy();
  }


  applyChange(): void {
    this.videoService.updateVideo(this.VideoId,this.video);
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
