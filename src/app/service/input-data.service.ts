import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';

import PouchDB from 'pouchdb';
import { WorkPackService } from './work-pack.service';
import { TaskService } from './task.service';
import { EquipmentService } from './equipment.service';
import { ActivityService } from './activity.service';
import { ObservationService } from './observation.service';
import { AssessmentCodeService } from './assessment-code.service';

@Injectable()
export class InputDataService {

  constructor(
    private config: ConfigurationService,
    private workOrderService: WorkPackService,
    private taskService: TaskService,
    private equipmentService: EquipmentService,
    private activityService: ActivityService,
    private observationService: ObservationService,
    private assessmentCodeService: AssessmentCodeService,
  ) { }

  public Clear() {
    this.workOrderService.clearServiceData();
    this.taskService.clearServiceData();
    this.equipmentService.clearServiceData();
    this.activityService.clearServiceData();
    this.observationService.clearServiceData();
    this.assessmentCodeService.clearServiceData();
  
    this.ClearStorage();    
  }

  public Load() {
    this.config.log('Loading work orders');
    this.workOrderService.getInputData();
    
    this.config.log('Loading tasks');
    this.taskService.getInputData();

    this.config.log('Loading equipment');
    this.equipmentService.getInputData();

    this.config.log('Loading activities');
    this.activityService.getInputData();

    this.config.log('Loading observations');
    this.observationService.getInputData();

    this.config.log('Loading codes');
    this.assessmentCodeService.getInputData();
  }

  public Save() {
    // this.config.log('Waiting for data to load');
    // let dependencies = Observable.zip(
    //   this.workOrderService.getList(),
    //   this.taskService.getList(),
    //   this.equipmentService.getList(),
    //   this.activityService.getList(),
    //   this.observationService.getList(),
    //   this.assessmentCodeService.getList());
    
    //   let subscription = dependencies.subscribe(([w, t, e, a, o, ac]) => {
    //     this.config.log('Saving data to storage');
        this.SaveStorage();  
      // });

      // subscription.unsubscribe();
  }

  private SaveStorage() {
    this.config.log('Saving work orders');
    this.workOrderService.saveStorage();

    this.config.log('Saving tasks');
    this.taskService.saveStorage();

    this.config.log('Saving equipment');
    this.equipmentService.saveStorage();

    this.config.log('Saving activities');
    this.activityService.saveStorage();

    this.config.log('Saving observations');
    this.observationService.saveStorage();

    this.config.log('Saving codes');
    this.assessmentCodeService.saveStorage();
  }

  private ClearStorage() {
    this.config.log('Clearing work orders');
    this.workOrderService.clearStorage();

    this.config.log('Clearing tasks');
    this.taskService.clearStorage();

    this.config.log('Clearing equipment');
    this.equipmentService.clearStorage();

    this.config.log('Clearing activities');
    this.activityService.clearStorage();

    this.config.log('Clearing observations');
    this.observationService.clearStorage();

    this.config.log('Clearing codes');
    this.assessmentCodeService.clearStorage();
  }
}
