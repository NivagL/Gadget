import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { SelectableListService } from './selecteable-list-service'

import { InspectionService } from './inspection.service';
import { Inspection } from '../model/inspection';
import { InspectionPhoto } from '../model/inspection-photo'

@Injectable()
export class InspectionPhotoService extends SelectableListService<InspectionPhoto> {
  private inspection: Observable<Inspection>;
  private subscription;

  constructor( inspectionService: InspectionService,
    config: ConfigurationService, 
    http: HttpClient) {
    super('EquipmentPhoto', config, http);
  
    // this.inspection = inspectionService.getSelected();
    // this.subscription = this.inspection.subscribe(i => {
    //   let inspectionPhotos = new Array<InspectionPhoto>();
    //   this.loaded_list.forEach(p => {
    //     if(p.InspectionId == i._id) {
    //       inspectionPhotos.push(p);
    //     }
    //   });
    //   this.list.next(inspectionPhotos);
    // });
  }
}
