import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, zip } from 'rxjs';

import { WorkPack } from '../model/work-pack'
import { Inspection } from '../model/inspection'
import { InspectionService } from './inspection.service';
import { WorkPackService } from './work-pack.service';

@Injectable()
export class FilteredInspectionService {
  inspections: BehaviorSubject<Array<Inspection>>;
  getList(): Observable<Array<Inspection>> { return this.inspections; } 
  setList(data: Array<Inspection>) { this.inspections.next(data); } 
  //TODO **GL** use an interface - make this service look like a list or selectable list?

  workPackId: string = "";
  workPack: Observable<WorkPack>;
  workPackSubscription;

  inspection: BehaviorSubject<Inspection>;
  getSelected(): Observable<Inspection> { return this.inspection; } 
  setSelected(data: Inspection) { this.inspectionService.setSelected(data); } 
  //TODO **GL** use an interface - make this service look like a list or selectable list?
  
  constructor(private workOrderService: WorkPackService,
    private inspectionService: InspectionService) { 
    this.inspections = new BehaviorSubject<Array<Inspection>>(new Array<Inspection>());
    this.inspection = new BehaviorSubject<Inspection>( new Inspection() );
      
    this.workPack = workOrderService.getSelected();
    this.workPackSubscription = this.workPack.subscribe(w => {
      console.log('filtered...' + JSON.stringify(w));
      if(w._id != '') {
        this.workPackId = w._id;
        this.newInspections();
      }
    });
    
    //when the inspections have loaded get the new status
    let dependencies = zip(this.workPack, this.inspectionService.getList());

    dependencies.subscribe(([w, i]) => {
      this.workPackId = w._id;
      this.newInspections();
    }); 

    this.inspectionService.getSelected().subscribe(i => {
      this.inspection.next(i);
    });

  }

  private newInspections() {
    let newList = new Array<Inspection>();
    if(this.workPackId != "") {
      newList = this.inspectionService.getLoadedList().filter(i => 
        i.WorkOrderId.toString() == this.workPackId)
    }
    this.inspections.next(newList);
    // this.inspections.next(newList.sort((i, j) => i.GISID - j.GISID));
  }
}
