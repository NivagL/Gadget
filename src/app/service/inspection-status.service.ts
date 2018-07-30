import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, zip } from 'rxjs';

import { WorkPack } from '../model/work-pack'
import { Inspection } from '../model/inspection'
import { InspectionStatus } from '../model/inspection-status'
import { InspectionService } from './inspection.service';
import { WorkPackService } from './work-pack.service';

@Injectable()
export class InspectionStatusService {
  public status: BehaviorSubject<InspectionStatus>;

  workPackId: string;
  workPack: Observable<WorkPack>;
  workPackSubscription;

  inspection: Observable<Inspection>;
  inspectionSubscription;
  
  constructor(private workOrderService: WorkPackService,
    private inspectionService: InspectionService) { 
    this.status = new BehaviorSubject<InspectionStatus>(
      new InspectionStatus());
    
    this.workPack = workOrderService.getSelected();
    this.workPackSubscription = this.workPack.subscribe(w =>{
      if(w._id != '') {
        this.workPackId = w._id;
        this.newStatus();
      }
    });
    
    this.inspection = this.inspectionService.getSelected();
    this.inspectionSubscription = this.inspection.subscribe(i => {
      this.newStatus();
    });

    //when the inspections have loaded get the new status
    let dependencies = zip(this.workPack, this.inspectionService.getList());

    dependencies.subscribe(([w, i]) => {
      this.workPackId = w._id;
      this.newStatus();
    }); 
  }

  private newStatus() {
    let newStatus = new InspectionStatus();
    newStatus.pendingCount = this.inspectionService.getCount(this.workPackId, 'pending');
    newStatus.completeCount = this.inspectionService.getCount(this.workPackId, 'done');
    newStatus.holdCount = this.inspectionService.getCount(this.workPackId, 'hold');
    newStatus.cancelledCount = this.inspectionService.getCount(this.workPackId, 'cancelled');
    // console.log('InspectionStatusService: ' + w.Title + ': ' + JSON.stringify(newStatus));
    this.status.next(newStatus);
  }
}
