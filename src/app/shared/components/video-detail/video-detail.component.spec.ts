import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailComponent } from './video-detail.componentOLD';

describe('VideoDetailComponent', () => {
  let component: VideoDetailComponent;
  let fixture: ComponentFixture<VideoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
