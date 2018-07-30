import { TestBed, inject } from '@angular/core/testing';

import { OutputDataService } from './output-data.service';

describe('OutputDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutputDataService]
    });
  });

  it('should be created', inject([OutputDataService], (service: OutputDataService) => {
    expect(service).toBeTruthy();
  }));
});
