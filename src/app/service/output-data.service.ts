import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';

import PouchDB from 'pouchdb';
import { InspectionService } from './inspection.service';
import { InspectionActivityService } from './inspection-activity.service';
import { InspectionObservationService } from './inspection-observation.service';
import { InspectionPhotoService } from './inspection-photo.service';

@Injectable()
export class OutputDataService {

  constructor(
    private config: ConfigurationService,
    private inspectionService: InspectionService,
    private inspectionActivityService: InspectionActivityService,
    private inspectionObservationService: InspectionObservationService,
    private inspectionPhotoService: InspectionPhotoService) { 
  }

  public GenerateInspections() {
    this.config.log('Generating inspections');
    this.inspectionService.createInspections();
  }

  public Clear() {
    this.config.log('Clearings inspections');
    this.inspectionService.clearServiceData();

    this.config.log('Clearings inspection activities');
    this.inspectionActivityService.clearServiceData();

    this.config.log('Clearings inspection observations');
    this.inspectionObservationService.clearServiceData();

    this.config.log('Clearings inspection photos');
    this.inspectionPhotoService.clearServiceData();
  
    this.ClearStorage();
  }

  public Save() {
    this.SaveStorage();
  }

  private SaveStorage() {
    this.config.log('Saving inspections');
    this.inspectionService.saveStorage();

    this.config.log('Saving inspections activities');
    this.inspectionActivityService.saveStorage();

    this.config.log('Saving inspections observations');
    this.inspectionObservationService.saveStorage();
  }

  private ClearStorage() {
    this.config.log('Clearing storage inspections');
    this.inspectionService.clearStorage();

    this.config.log('Clearing storage inspection activities');
    this.inspectionActivityService.clearStorage();

    this.config.log('Clearing storage inspection observations');
    this.inspectionObservationService.clearStorage();

    this.config.log('Clearing storage inspection photos');
    new PouchDB('InspectionPhoto').destroy()
    .then(() => {
        console.log('Pouch DB dropped ' + 'inspection-photo');
    }).catch(function (err) {
        console.log('Error dropping Pouch DB ' + 'inspection-photo' + ' ' + err);
    })
  }
  
}
