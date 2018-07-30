import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, zip, BehaviorSubject } from 'rxjs';

import { Activity } from '../../model/activity';
import { AccessDetails } from '../../model/access';
import { Equipment } from '../../model/equipment';
import { AssessmentCode } from '../../model/assessment-code'
import { Inspection } from '../../model/inspection';
import { InspectionActivity } from '../../model/inspection-activity';
// import { InspectionObservation } from '../../../model/inspection-observation';

import { InspectionService } from '../../service/inspection.service';
import { InspectionActivityService } from '../../service/inspection-activity.service';
import { InspectionObservationService } from '../../service/inspection-observation.service';
// import { AccessDialogComponent } from '../access-dialog/access-dialog.component';
// import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit, OnDestroy {

  _inspection: Inspection;
  @Input() set inspection(data: Inspection) {
    this._inspection = data;
  }
  get inspection(): Inspection {
    return this._inspection;
  }

  activities: BehaviorSubject<Array<InspectionActivity>>;
  activitiesSubscriptions;

  // selectedActivity: BehaviorSubject<InspectionActivity>;
  // selectedActivitySubscriptions;
  
  // observations: BehaviorSubject<Array<InspectionObservation>>;
  // observationsSubscriptions;

  // selectedCode: BehaviorSubject<AssessmentCode>;
  // notes: string;
  
  constructor(public dialog: MatDialog, 
    private inspectionService: InspectionService,
    private activityService: InspectionActivityService,
    private observationService: InspectionObservationService,
    ) { 
  }

  opened(a: InspectionActivity) {
    a.Expanded = true;
  }

  closed(a: InspectionActivity){
    a.Expanded = false;
  }

  onActivityComplete(activityid: string) {
    this.activities.subscribe(list => {
      list.forEach(a => {
        a.Expanded = false;
        if(a._id == activityid) {
          a.CompletedOn = new Date();
        }
      });
      // let activity = list.find(a => a._id == activityid);
      // if(activity != undefined) {
      //   activity.Expanded = false;
      // }
    });
  }
  
  ngOnInit() {
    // this.inspection = this.inspectionService.getSelected();
    this.activities = new BehaviorSubject<Array<InspectionActivity>>(new Array<InspectionActivity>());
    // this.selectedCode = new BehaviorSubject<AssessmentCode>(undefined);
    // this.selectedActivity = new BehaviorSubject<InspectionActivity>(new InspectionActivity());
    // this.observations = new BehaviorSubject<Array<InspectionObservation>>(new Array<InspectionObservation>());

    //get the activities for the inspection
    const activityDependencies = zip(
      this.inspectionService.getSelected(),
      this.activityService.getList(),
    );

    this.activitiesSubscriptions = activityDependencies.subscribe(([inspection, activities]) => {
      let list = new Array<InspectionActivity>();
      activities.sort((a, b)=> +a.Activity._id - +b.Activity._id);
      activities.forEach(a => {
        if(a.InspectionId.toString() == inspection._id) {
          list.push(a);
        }
      });
      this.activities.next(list);
      // this.selectedActivity.next(list[0]);
    });
  }

  // onActivityClick(event: InspectionActivity) {
  //   this.selectedActivity.next(event);
  //   //get the observations for the selected activity
  //   const observationDependencies = Observable.zip(
  //     this.inspectionService.getSelected(),
  //     this.selectedActivity,
  //     this.observationService.getList(),
  //   );

  //   observationDependencies.subscribe(([inspection, activity, observations])=>{
  //     let list = new Array<InspectionObservation>();
  //     observations.forEach(o => {
  //         if(o.InspectionId.toString() == inspection._id
  //           && o.ActivityId.toString() == activity._id) {
  //           list.push(o);
  //         }
  //       });
  //       console.log('obs: ' + list.length);
  //       this.observations.next(list);
  //   });
  // }

  // onSelectedCode(event: AssessmentCode) {
  //   console.log('AssessmentCodeComponent.onSelectedCode: ' + JSON.stringify(event));
  //   this.selectedCode.next(event);
  // }
  
  ngOnDestroy() {
    // this.activitiesSubscriptions.unsubscribe();
    // this.observationsSubscriptions.unsubscribe();
  }

  // openAccessDialog(): void {
  //   // if(this.selected..Access == undefined) {
  //   //   this.selected.Result.Access = new Access();
  //   // }
  //   let dialogRef = this.dialog.open(AccessDialogComponent, {
  //     width: '400px',
  //     data: { item: new AccessDetails() }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed');
  //     //this.selected.Result.Access = result;
  //   });
  // }

  // openPhotoGallery(): void {
  //   let dialogRef = this.dialog.open(PhotoGalleryComponent, {
  //     width: '600px', height: '650px', 
  //     data: { item: new Array<string>() }
  //   });
  // }

  onClick(event) {
    // console.log(JSON.stringify(event));
  }

  showDefects(activity: Activity): boolean {
    return activity.Code.startsWith('PD');
  }
  
  getCount(activityid) {
    return this.observationService.getCount(this.inspection._id, activityid);
  }

  Save() {
    this.inspectionService.updateStorage(this.inspection);
  }
}
