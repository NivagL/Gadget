import { TestBed, inject } from '@angular/core/testing';

import { SelectableListServiceIdbService } from './selectable-list-service-idb.service';

describe('SelectableListServiceIdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectableListServiceIdbService]
    });
  });

  it('should be created', inject([SelectableListServiceIdbService], (service: SelectableListServiceIdbService) => {
    expect(service).toBeTruthy();
  }));
});
