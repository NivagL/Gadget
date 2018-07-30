import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { InspectionObservationService } from '../../../service/inspection-observation.service';
import { InspectionObservation } from '../../../model/inspection-observation'

@Component({
  selector: 'app-inspection-observation-data',
  templateUrl: './inspection-observation-data.component.html',
  styleUrls: ['./inspection-observation-data.component.css']
})
export class InspectionObservationDataComponent implements OnInit, OnDestroy {
  list: Observable<Array<InspectionObservation>>;
  listSubscription;
  count: number;

  constructor(private service: InspectionObservationService) { }

  ngOnInit() {
    this.list = this.service.getList();
    this.listSubscription = this.list.subscribe(l => {this.count = l.length});
  }

  ngOnDestroy() {
    if(this.listSubscription != undefined) {
      this.listSubscription.unsubscribe();
    }
  }

  OnClear() {
    this.service.clearServiceData();
  }

  OnLoadData() {
    this.service.getInputData();
  }

  OnSaveStorage() {
    this.service.saveStorage();
  }

  OnClearStorage() {
    this.service.clearStorage();
  }

}
