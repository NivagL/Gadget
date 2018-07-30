import { TestBed, inject } from '@angular/core/testing';

import { InspectionObservationService } from './inspection-observation.service';

describe('InspectionObservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionObservationService]
    });
  });

  it('should be created', inject([InspectionObservationService], (service: InspectionObservationService) => {
    expect(service).toBeTruthy();
  }));
});
