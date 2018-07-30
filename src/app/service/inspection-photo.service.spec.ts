import { TestBed, inject } from '@angular/core/testing';

import { InspectionPhotoService } from './inspection-photo.service';

describe('InspectionPhotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionPhotoService]
    });
  });

  it('should be created', inject([InspectionPhotoService], (service: InspectionPhotoService) => {
    expect(service).toBeTruthy();
  }));
});
