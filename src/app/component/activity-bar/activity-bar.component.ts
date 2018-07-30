import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inspection } from '../../model/inspection';
import { InspectionActivity } from '../../model/inspection-activity';
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-activity-bar',
  templateUrl: './activity-bar.component.html',
  styleUrls: ['./activity-bar.component.css']
})
export class ActivityBarComponent implements OnInit {
  @Output() onSelectedActivity: EventEmitter<InspectionActivity>;
  
  _activities: Array<InspectionActivity>;
  @Input() set activities(data: Array<InspectionActivity>) {
    this._activities = data;
  }
  get activities(): Array<InspectionActivity> {
    return this._activities;
  }

  _selectedActivity: InspectionActivity;
  @Input() set selectedActivity(data: InspectionActivity) {
    this._selectedActivity = data;
  }
  get selectedActivity(): InspectionActivity {
    return this._selectedActivity;
  }

  index: number = -1;

  constructor(public config: ConfigurationService) { 
    this.onSelectedActivity = new EventEmitter();
  }

  ngOnInit() {
    this.onNext();
  }

  onPrevious() {
    if(this.index > 0) {
      this.index -= 1;
    }
    this.selectedActivity = this.activities[this.index];
    this.onSelectedActivity.emit(this.selectedActivity);
  }

  onNext() {
    if(this.index < this.activities.length - 1) {
      this.index += 1;
    }
    this.selectedActivity = this.activities[this.index];
    this.onSelectedActivity.emit(this.selectedActivity);
  }
}
