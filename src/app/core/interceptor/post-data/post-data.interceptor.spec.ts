import { TestBed } from '@angular/core/testing';

import { PostDataInterceptor } from './post-data.interceptor';

describe('PostDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PostDataInterceptor = TestBed.inject(PostDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
