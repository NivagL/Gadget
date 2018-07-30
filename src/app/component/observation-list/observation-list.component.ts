import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, zip } from 'rxjs';

import { AccessDetails } from '../../model/access';
import { Equipment } from '../../model/equipment';
import { Inspection } from '../../model/inspection';
import { AssessmentCode } from '../../model/assessment-code'
import { Observation } from '../../model/observation'
import { InspectionObservation } from '../../model/inspection-observation';

import { AssessmentCodeService } from '../../service/assessment-code.service'
import { InspectionService } from '../../service/inspection.service'
import { InspectionObservationService } from '../../service/inspection-observation.service'

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.css']
})
export class ObservationListComponent implements OnInit {
  @Output() onActivityComplete: EventEmitter<string>;
  
  _activityId: string;
  @Input() set ActivityId(value:string){
    this._activityId = value;
  }
  get ActivityId(): string { 
    return this._activityId; 
  }
  inspection: Observable<Inspection>;
  observations: BehaviorSubject<Array<InspectionObservation>>;
  subscriptions;

  constructor(
    private inspectionService: InspectionService,
    private inspectionObservationService: InspectionObservationService
    ) { 
    this.onActivityComplete = new EventEmitter();
  }

  activityComplete(activityid: string) {
    this.onActivityComplete.emit(activityid);
  }
  
  ngOnInit() {
    this.inspection = this.inspectionService.getSelected();
    this.observations = new BehaviorSubject<Array<InspectionObservation>>(new Array<InspectionObservation>());
    
    const dependents = zip(
      this.inspectionService.getSelected(),
      this.inspectionObservationService.getList(),
    );

    this.subscriptions = dependents.subscribe(([inspection, observations]) => {
      let list = new Array<InspectionObservation>();

      observations.sort((a, b)=> +a.Observation._id - +b.Observation._id);
      
      observations.forEach(o => {
        if(o.InspectionId.toString() == inspection._id
          && o.ActivityId.toString() == this.ActivityId) {
          list.push(o);
        }
      });
      //console.log('obs: ' + list.length);
      this.observations.next(list);
    });
  }

  ngOnDestroy() {
    if(this.subscriptions != undefined) {
      this.subscriptions.unsubscribe();
    }
  }
  
}
