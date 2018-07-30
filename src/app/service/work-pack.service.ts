import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectableListServiceIdb } from './selectable-list-service-idb.service'

import { ConfigurationService } from './configuration.service';
import { WorkPack } from '../model/work-pack'

@Injectable()
export class WorkPackService extends SelectableListServiceIdb<WorkPack>{
  constructor(config: ConfigurationService, 
    http: HttpClient) {
    super('WorkPack', config, http);
  }
}
