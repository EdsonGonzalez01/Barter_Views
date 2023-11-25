import { TestBed } from '@angular/core/testing';

import { BarterService } from './barter.service';

describe('BarterService', () => {
  let service: BarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
