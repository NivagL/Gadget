import { TestBed, inject } from '@angular/core/testing';

import { InspectionActivityService } from './inspection-activity.service';

describe('InspectionResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionActivityService]
    });
  });

  it('should be created', inject([InspectionActivityService], (service: InspectionActivityService) => {
    expect(service).toBeTruthy();
  }));
});
