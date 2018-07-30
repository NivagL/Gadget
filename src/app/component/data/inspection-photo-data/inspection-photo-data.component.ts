import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { InspectionPhotoService } from '../../../service/inspection-photo.service';
import { InspectionPhoto } from '../../../model/inspection-photo'

@Component({
  selector: 'app-inspection-photo-data',
  templateUrl: './inspection-photo-data.component.html',
  styleUrls: ['./inspection-photo-data.component.css']
})
export class InspectionPhotoDataComponent implements OnInit {
  list: Observable<Array<InspectionPhoto>>;
  listSubscription;
  count: number;

  constructor(private service: InspectionPhotoService) { 
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

  OnClick(event: InspectionPhoto) {
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
