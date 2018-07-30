import { TestBed, inject } from '@angular/core/testing';

import { WorkPackService } from './work-pack.service';

describe('WorkOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkPackService]
    });
  });

  it('should be created', inject([WorkPackService], (service: WorkPackService) => {
    expect(service).toBeTruthy();
  }));
});
