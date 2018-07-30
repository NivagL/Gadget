import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list-service'

import { ConfigurationService } from './configuration.service';
import { AssessmentCode } from '../model/assessment-code'

@Injectable()
export class AssessmentCodeService extends ListService<AssessmentCode> {

  constructor(config: ConfigurationService, 
    http: HttpClient) {
    super('AssessmentCode', config, http);
  }
  
}