import { TestBed, inject } from '@angular/core/testing';

import { AssessmentCodeService } from './assessment-code.service';

describe('AssessmentCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentCodeService]
    });
  });

  it('should be created', inject([AssessmentCodeService], (service: AssessmentCodeService) => {
    expect(service).toBeTruthy();
  }));
});
