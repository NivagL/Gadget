import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { AssessmentCode } from '../../../model/assessment-code'
import { AssessmentCodeService } from '../../../service/assessment-code.service'

import { Inspection } from '../../../model/inspection'
import { Observation } from '../../../model/observation'
import { InspectionObservation } from '../../../model/inspection-observation'
import { InspectionObservationService } from '../../../service/inspection-observation.service'
import { ConfigurationService } from '../../../service/configuration.service'

import { PhotoGalleryComponent } from '../../gallery/photo-gallery/photo-gallery.component';
import { PhotoGalleryLsComponent } from '../../gallery/photo-gallery-ls/photo-gallery-ls.component';
import { PhotoGallery3Component } from '../../gallery/photo-gallery-3/photo-gallery-3.component';
import { PhotoGallery4Component } from '../../gallery/photo-gallery-4/photo-gallery-4.component';

@Component({
  selector: 'app-assessment-code',
  templateUrl: './assessment-code.component.html',
  styleUrls: ['./assessment-code.component.css']
})
export class AssessmentCodeComponent implements OnInit {
  @Input() inspection: Inspection;
  @Input() observation: InspectionObservation;
  photoDialogRef: MatDialogRef<PhotoGalleryComponent>;
  selectedCodeText: string;
  codes: Observable<Array<AssessmentCode>>;

  constructor(public dialog: MatDialog, public config: ConfigurationService,
    private inspectionObservationService: InspectionObservationService,
    private codeService: AssessmentCodeService) {
  }

  ngOnInit() {
    this.codes = this.codeService.getList();
    this.codes.subscribe(list => {
      let code = list.find(c => c.CA == this.observation.SelectedCode);
      if(code != undefined) {
        this.selectedCodeText = code.ShortText;
      }
    });
  }

  enabled(code: number): boolean {
    // console.log('AssessmentCodeComponent.enabled : ' + JSON.stringify(this.observation));
    return this.observation.Observation.ValidCodes.includes(code);
  }

  checked(code: number): boolean {
    // console.log('AssessmentCodeComponent.checked : ' + JSON.stringify(this.observation));
    if(this.observation == undefined || this.observation.SelectedCode == undefined) {
      return false;
    }
    return this.observation.SelectedCode == code;
  }
  
  Save() { 
    // console.log('********saving: ' + JSON.stringify(this.observation));
    this.inspectionObservationService.updateStorage(this.observation)
  }

  onClick(event: AssessmentCode) {
    if(event == undefined) {
      this.observation.SelectedCode = -1;
      this.selectedCodeText = "";
    } else {
      if(this.enabled(event.CA)) {
        this.observation.SelectedCode = event.CA;
        this.selectedCodeText = event.ShortText;
      }
    }
    this.Save();
  }

  openPhotoGallery(): void {
    let dialogRef = this.dialog.open(PhotoGallery4Component,{
      // width: '100%', 
      // height: '100%'
      width: '100vw', 
      height: 'auto'
    });
    dialogRef.componentInstance.inspection = this.inspection;
    dialogRef.componentInstance.launch_observation = this.observation.Observation;
  }
}
