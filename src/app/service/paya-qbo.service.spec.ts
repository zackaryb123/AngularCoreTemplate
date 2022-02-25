import { TestBed } from '@angular/core/testing';

import { PayaQboService } from './paya-qbo.service';

describe('PayaQboService', () => {
  let service: PayaQboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayaQboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
