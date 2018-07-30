import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list-service'

import { ConfigurationService } from './configuration.service';
import { Activity } from '../model/activity'

@Injectable()
  export class ActivityService extends ListService<Activity> {

    constructor(config: ConfigurationService, 
      http: HttpClient) {
      super('Activity', config, http);
    }
  
}
