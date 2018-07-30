import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ListService } from './list-service'
import { ListServiceIdb } from './list-service-idb.service'

import { ConfigurationService } from './configuration.service';
import { Task } from '../model/task'

@Injectable()
export class TaskService extends ListServiceIdb<Task> { // ListService<Task> {

  constructor(config: ConfigurationService, 
    http: HttpClient) {
    super('Task', config, http);
  }

}
