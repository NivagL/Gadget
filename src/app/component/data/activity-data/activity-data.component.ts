import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Observation } from '../../../model/observation'
import { Activity } from '../../../model/activity'
import { ActivityService } from '../../../service/activity.service'

@Component({
  selector: 'app-activity-data',
  templateUrl: './activity-data.component.html',
  styleUrls: ['./activity-data.component.css']
})
export class ActivityDataComponent implements OnInit {
  list: Observable<Array<Activity>>;

  constructor(private activityService:ActivityService) { }

  ngOnInit() {
    this.list = this.activityService.getList();
  }

  ngOnDestroy() {
  }

}
