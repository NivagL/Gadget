import { TestBed, inject } from '@angular/core/testing';

import { FilteredInspectionService } from './filtered-inspection.service';

describe('FilteredInspectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilteredInspectionService]
    });
  });

  it('should be created', inject([FilteredInspectionService], (service: FilteredInspectionService) => {
    expect(service).toBeTruthy();
  }));
});
