import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ListService } from './list-service'
import { Activity } from '../model/activity'
import { Observation } from '../model/observation'
import { InspectionObservation } from '../model/inspection-observation'

@Injectable()
export class InspectionObservationService extends ListService<InspectionObservation>{

  constructor(public config: ConfigurationService, 
    public http: HttpClient
    ) { 
    super('InspectionObservation', config, http);
  }

  public getCount(inspectionid:string, activityid): number {
    let count: number = 0;

    //from the loaded list...
    if(this.loaded_list == undefined || inspectionid == undefined 
      || activityid == undefined || this.loaded_list.length == 0 ) {
      return 0;
    }

    this.loaded_list.forEach(o => {
      if(o.InspectionId == inspectionid && o.ActivityId == activityid
        && o.SelectedCode != -1 ){
       count += 1; 
      }
    });

    return count;
  }

  public checkObservations(inspectionId: string): number {
    let count: number = 0;
    this.loaded_list.forEach(o => {
      if(o.InspectionId == inspectionId) {
        if(o.Observation.Mandatory != undefined && o.Observation.Mandatory) {
          //ObCode control doesn't support non-selected positive input
          if(o.Observation.Type != 'ObCode') {
            if(o.Document == undefined || o.Document.length == 0) {
              count += 1;
            }
          }
        }
      } 
    });
    return count;
  }

  create(workOrderId: number, taskId: number, equipmentId: number, inspectionId: string, 
    activityId: string, obs: Observation) {

    let existing = this.loaded_list.find(io => 
      io.WorkOrderId == workOrderId
      && io.TaskId == taskId 
      && io.EquipmentId == equipmentId
      && io.InspectionId == inspectionId
      && io.ActivityId == activityId
      && io.Observation.Code == obs.Code 
      );
      
    if(existing == undefined) {
      let o: InspectionObservation = new InspectionObservation();
      //o._id = observationId.toString();
      o.WorkOrderId = workOrderId;
      o.TaskId = taskId;
      o.InspectionId = inspectionId;
      o.EquipmentId = equipmentId;
      o.ActivityId = activityId;
      o.Observation = obs;
      o.SelectedCode = -1;
      
      super.updateStorageNewId(o);
      this.loaded_list.push(o);
      this.list.next(this.loaded_list);
    }
  }
}
