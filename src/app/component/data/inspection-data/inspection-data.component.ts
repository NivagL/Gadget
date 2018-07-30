import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter'

import { Inspection } from '../../../model/inspection'
import { InspectionService } from '../../../service/inspection.service';

@Component({
  selector: 'app-inspection-data',
  templateUrl: './inspection-data.component.html',
  styleUrls: ['./inspection-data.component.css']
})
export class InspectionDataComponent implements OnInit, OnDestroy {
  list: Observable<Array<Inspection>>;
  listSubscription;
  count: number;

  constructor(private service: InspectionService) { 
  }

  ngOnInit() {
    this.list = this.service.getList();
    this.listSubscription = this.list.subscribe(l => {this.count = l.length});
  }

  ngOnDestroy() {
    if(this.listSubscription != undefined) {
      this.listSubscription.unsubscribe();
    }
  }

  OnClick(event: Inspection) {
    this.service.setSelected(event);
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