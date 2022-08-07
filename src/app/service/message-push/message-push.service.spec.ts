import { TestBed } from '@angular/core/testing';

import { MessagePushService } from './message-push.service';

describe('MessagePushService', () => {
  let service: MessagePushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagePushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
