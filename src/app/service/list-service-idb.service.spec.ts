import { TestBed, inject } from '@angular/core/testing';

import { ListServiceIdbService } from './list-service-idb.service';

describe('ListServiceIdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListServiceIdbService]
    });
  });

  it('should be created', inject([ListServiceIdbService], (service: ListServiceIdbService) => {
    expect(service).toBeTruthy();
  }));
});
