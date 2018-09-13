import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccessDetails } from '../../model/access'
import { Inspection } from '../../model/inspection'
import { ConfigurationService } from '../../service/configuration.service';
import { InspectionService } from '../../service/inspection.service';
import { InspectionObservationService } from '../../service/inspection-observation.service';
import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AccessDialogComponent } from '../access-dialog/access-dialog.component';
import { PhotoGalleryComponent } from '../gallery/photo-gallery/photo-gallery.component';
import { PhotoGalleryLsComponent } from '../gallery/photo-gallery-ls/photo-gallery-ls.component';
import { PhotoGallery3Component } from '../gallery/photo-gallery-3/photo-gallery-3.component';
import { PhotoGallery4Component } from '../gallery/photo-gallery-4/photo-gallery-4.component';


@Component({
  selector: 'app-inspection-toolbar',
  templateUrl: './inspection-toolbar.component.html',
  styleUrls: ['./inspection-toolbar.component.css']
})
export class InspectionToolbarComponent implements OnInit {
  _inspection: Inspection;
  @Input() set inspection(data: Inspection) {
    this._inspection = data;
  }
  get inspection(): Inspection {
    return this._inspection;
  }

  constructor(public dialog: MatDialog,
    private router: Router,
    public config: ConfigurationService,
    public inspectionService: InspectionService,
    public observationService: InspectionObservationService) { 
  }

  ngOnInit() {
  }

  //Inspection toolbar
  onComplete() {
    let count = this.observationService.checkObservations(this.inspection._id);
    if(count > 0) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent);
      let dialogmsg = count == 1? 'There is a mandatory question to complete.' 
        : 'There are ' + count + ' mandatory questions to complete.';
      dialogRef.componentInstance.confirmMessage = dialogmsg;
      dialogRef.componentInstance.style = 'OK';
      return;
      // dialogRef.afterClosed().subscribe(result => {
      //   if(result) {
      //   }
      // });
    }
    this.inspection.Status = 'done';
    this.config.log('Completed ' + this.inspection.SiteAddress);
    this.inspectionService.updateStorage(this.inspection);
    this.router.navigate(['/list']);  
  }

  onHold() {
    this.inspection.Status = 'hold';
    this.config.log('On hold ' + this.inspection.SiteAddress);
    this.inspectionService.updateStorage(this.inspection);
    this.router.navigate(['/list']);  
  }

  onCancel() {
    this.inspection.Status = 'cancelled';
    this.config.log('Cancelled ' + this.inspection.SiteAddress);
    this.inspectionService.updateStorage(this.inspection);
    this.router.navigate(['/list']);  
  }

  openAccessDialog(): void {
    let dialogRef = this.dialog.open(AccessDialogComponent, {
      position: {top: '0%'}, width: '70%', height: '60%'
    });
    if(this.inspection.Access == undefined) {
      dialogRef.componentInstance.access = new AccessDetails();
      dialogRef.componentInstance.access.ContactName = '';
    } else {
      dialogRef.componentInstance.access = this.inspection.Access;
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(this.inspection.Access == undefined) {
          this.inspection.Access = dialogRef.componentInstance.access;
        }
            
        this.inspectionService.updateStorage(this.inspection);
      }
    });
  }

  openPhotoGallery(): void {
    let dialogRef = this.dialog.open(PhotoGallery4Component, {
      // width: '100%',
      // height: '100%'
      // width: '1000px',
      // height: '800px'
      width: '100vw',
      height: 'auto'
    });
    dialogRef.componentInstance.inspection = this.inspection;
  }

  onClick() {
    if(this.router.isActive('/list', true)) {
      this.router.navigate(['/inspection']);  
    }
    if(this.router.isActive('/inspection', true)) {
      this.router.navigate(['/list']);  
    }
  }
}
