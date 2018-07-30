import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AssessmentCode } from '../../../model/assessment-code';
import { Inspection } from '../../../model/inspection';
import { InspectionService } from '../../../service/inspection.service';
import { WorkPack } from '../../../model/work-pack';
import { WorkPackService } from '../../../service/work-pack.service';
import { InspectionObservation } from '../../../model/inspection-observation';
import { InspectionActivityService } from '../../../service/inspection-activity.service';
import { InspectionObservationService } from '../../../service/inspection-observation.service';
import { FilteredInspectionService } from '../../../service/filtered-inspection.service';
import { InspectionActivity } from '../../../model/inspection-activity';
import { ConfigurationService } from '../../../service/configuration.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  workPacks: Observable<Array<WorkPack>>;
  selectedPack: Observable<WorkPack>;
  inspections: Observable<Array<Inspection>>;
  filteredInspections: Observable<Array<Inspection>>;
  selectedInspection: Observable<Inspection>;
  activities: BehaviorSubject<Array<InspectionActivity>>;
  selectedActivity: BehaviorSubject<InspectionActivity>;
  observations: BehaviorSubject<Array<InspectionObservation>>;
  selectedObservation: BehaviorSubject<InspectionObservation>;
  // observation: InspectionObservation;

  constructor(public config: ConfigurationService,
    private workPackService: WorkPackService,
    private inspectionService: InspectionService,
    private filteredInspectionsService: FilteredInspectionService,
    private inspectionActivityService: InspectionActivityService,
    private inspectionObservationService: InspectionObservationService) { 
    }

  ngOnInit() {
    this.activities = new BehaviorSubject<Array<InspectionActivity>>(new Array<InspectionActivity>());
    this.selectedActivity = new BehaviorSubject<InspectionActivity>(new InspectionActivity());
    this.observations = new BehaviorSubject<Array<InspectionObservation>>(new Array<InspectionObservation>());
    this.selectedObservation = new BehaviorSubject<InspectionObservation>(new InspectionObservation());
  

    this.workPacks = this.workPackService.getList();
    this.selectedPack = this.workPackService.getSelected();
    this.inspections = this.inspectionService.getList();
    this.filteredInspections = this.filteredInspectionsService.getList();
    this.selectedInspection = this.filteredInspectionsService.getSelected();
    this.selectedInspection.subscribe(i => {
      this.getActivities(i);
    });
  }

  onSelectedWorkPack($event) {

  }

  onSelectedInspection($event: Inspection) {
    this.inspectionService.setSelected($event);
    this.getActivities($event);
  }

  onSelectedActivity($event: InspectionActivity) {
    this.selectedActivity.next($event);
    this.selectedInspection.subscribe(i =>{
      this.getObservations(i, $event);
    })
  }
  
  getActivities(inspection: Inspection) {
    if(inspection == undefined || inspection._id == undefined) { return; }
    // this.filteredInspectionsService.setSelected(data);
    this.inspectionActivityService.getList().subscribe(list => {
      let newList = new Array<InspectionActivity>();
      list.forEach(a => {
        if(a.InspectionId == inspection._id) {
          newList.push(a);
        }
      })
      this.activities.next(newList);
      this.selectedActivity.next(newList[0]);
      this.getObservations(inspection, newList[0]);
    });
  }

  getObservations(inspection: Inspection, activity: InspectionActivity) {
    // this.selectedActivity.next(data);
    this.inspectionObservationService.getList().subscribe(list => {
      let newList = new Array<InspectionObservation>();
      list.forEach(o => {
        if(o.InspectionId == inspection._id
          && o.ActivityId == activity._id) {
          newList.push(o);
        }
      })
      this.observations.next(newList);
      this.selectedObservation.next(newList[0]);
    });
  }

  public onSelectedCode(code: AssessmentCode) {
    if(code == undefined) {
      console.log('TestPageComponent.onSelectedCode: No selection');
    } else {
      console.log('TestPageComponent.onSelectedCode: ' + JSON.stringify(code));
    }
  }

}
