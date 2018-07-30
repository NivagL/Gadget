import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ListService } from './list-service'
import { SelectableListService } from './selecteable-list-service'

import { Activity } from '../model/activity'
import { InspectionActivity } from '../model/inspection-activity'
import { ObservationService } from './observation.service'
import { InspectionObservationService } from './inspection-observation.service'

@Injectable()
export class InspectionActivityService extends ListService<InspectionActivity> {

  constructor(public config: ConfigurationService, 
    public http: HttpClient,
    public observationService: ObservationService,
    public inspectionObservationService: InspectionObservationService,
    ) { 
    super('InspectionActivity', config, http);
  }

  create(workOrderId: number, taskId: number, equipmentId: number, inspectionId: string, 
    activity: Activity) {

    let existing = this.loaded_list.find(ia => 
      ia.WorkOrderId == workOrderId
      && ia.TaskId == taskId 
      && ia.EquipmentId == equipmentId
      && ia.InspectionId == inspectionId
      && ia.Activity.Code == activity.Code
      );

    if(existing == undefined) {
      let a: InspectionActivity = new InspectionActivity();
      a.WorkOrderId = workOrderId;
      a.TaskId = taskId;
      a.InspectionId = inspectionId;
      a.EquipmentId = equipmentId;
      a.Activity = activity;
      a.Expanded = false;
      
      super.updateStorageNewId(a);
      this.loaded_list.push(a);
      this.list.next(this.loaded_list);

      this.observationService.getList().subscribe(list => {
        list.forEach(o => {
          if(o.Activity.Code == activity.Code && o.Activity.Version == activity.Version) {
            this.inspectionObservationService.create(workOrderId, taskId, 
              equipmentId, inspectionId, a._id, o);
          }
        })
      });
    }
  }
}
