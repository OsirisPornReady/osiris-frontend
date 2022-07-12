import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaBarComponent } from './criteria-bar.component';

describe('CriteriaBarComponent', () => {
  let component: CriteriaBarComponent;
  let fixture: ComponentFixture<CriteriaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
