import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { InspectionActivityService } from '../../../service/inspection-activity.service';
import { InspectionActivity } from '../../../model/inspection-activity'

@Component({
  selector: 'app-inspection-activity-data',
  templateUrl: './inspection-activity-data.component.html',
  styleUrls: ['./inspection-activity-data.component.css']
})
export class InspectionActivityDataComponent implements OnInit, OnDestroy {
  list: Observable<Array<InspectionActivity>>;
  listSubscription;
  count: number;

  constructor(private service: InspectionActivityService) { 
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

  // OnClick(event: InspectionActivity) {
  //   this.service.setSelected(event);
  // }

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
