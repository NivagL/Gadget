import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { WorkPack } from '../../../model/work-pack'
import { WorkPackService } from '../../../service/work-pack.service'

@Component({
  selector: 'app-work-order-data',
  templateUrl: './work-order-data.component.html',
  styleUrls: ['./work-order-data.component.css']
})
export class WorkOrderDataComponent implements OnInit {
  list: Observable<Array<WorkPack>>;
  listSubscription;

  constructor(private service:WorkPackService) { }

  ngOnInit() {
    this.list = this.service.getList();
    this.listSubscription = this.list.subscribe();
  }

  ngOnDestroy() {
    if(this.listSubscription != undefined) {
      this.listSubscription.unsubscribe();
    }
  }

  OnClick(event:WorkPack) {
    //this.service.toggleSelected(event);
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
