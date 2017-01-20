/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedserviceService } from './sharedservice.service';

describe('Service: Sharedservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedserviceService]
    });
  });

  it('should ...', inject([SharedserviceService], (service: SharedserviceService) => {
    expect(service).toBeTruthy();
  }));
});
