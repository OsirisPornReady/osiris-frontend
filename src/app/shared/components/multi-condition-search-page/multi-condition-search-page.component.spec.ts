import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiConditionSearchPageComponent } from './multi-condition-search-page.component';

describe('MultiConditionSearchPageComponent', () => {
  let component: MultiConditionSearchPageComponent;
  let fixture: ComponentFixture<MultiConditionSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiConditionSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiConditionSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
