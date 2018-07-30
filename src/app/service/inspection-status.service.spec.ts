import { TestBed, inject } from '@angular/core/testing';

import { InspectionStatusService } from './inspection-status.service';

describe('InspectionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionStatusService]
    });
  });

  it('should be created', inject([InspectionStatusService], (service: InspectionStatusService) => {
    expect(service).toBeTruthy();
  }));
});
