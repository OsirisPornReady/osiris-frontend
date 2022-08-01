import { TestBed } from '@angular/core/testing';

import { DashboardLazyLoadGuard } from './dashboard-lazy-load.guard';

describe('DashboardLazyLoadGuard', () => {
  let guard: DashboardLazyLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardLazyLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
