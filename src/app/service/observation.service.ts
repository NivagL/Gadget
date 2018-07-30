import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { Observation } from '../model/observation'
//import { ListService } from './list-service'
import { ListServiceIdb } from './list-service-idb.service';

@Injectable()
export class ObservationService extends ListServiceIdb<Observation>{

  constructor(config: ConfigurationService, 
    http: HttpClient) {
    super('Observation', config, http);
  }

}
