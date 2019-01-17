import { TestBed, inject } from '@angular/core/testing';

import { HtimelineLibService } from './htimeline-lib.service';

describe('HtimelineLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtimelineLibService]
    });
  });

  it('should be created', inject([HtimelineLibService], (service: HtimelineLibService) => {
    expect(service).toBeTruthy();
  }));
});
