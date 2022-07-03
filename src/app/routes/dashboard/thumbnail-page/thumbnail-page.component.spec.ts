import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailPageComponent } from './thumbnail-page.component';

describe('ThumbnailPageComponent', () => {
  let component: ThumbnailPageComponent;
  let fixture: ComponentFixture<ThumbnailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
