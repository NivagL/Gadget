import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Inspection } from '../../../model/inspection'
import { Observation } from '../../../model/observation'
import { InspectionObservation } from '../../../model/inspection-observation'
import { InspectionObservationService } from '../../../service/inspection-observation.service'
import { ConfigurationService } from '../../../service/configuration.service'

@Component({
  selector: 'app-activity-complete',
  templateUrl: './activity-complete.component.html',
  styleUrls: ['./activity-complete.component.css']
})
export class ActivityCompleteComponent implements OnInit {
  @Output() onActivityComplete: EventEmitter<string>;
  @Input() inspection: Inspection;
  @Input() observation: InspectionObservation;
  checked: boolean;

  constructor(public config: ConfigurationService,
    private inspectionObservationService: InspectionObservationService,
    ) {
    this.onActivityComplete = new EventEmitter();
  }

  ngOnInit() {
    this.checked = false;
    if(this.observation.Document && this.observation.Document == "Activity complete") {
      this.checked = true;
    }
  }

  onChanged() {
    this.observation.Document = this.checked ? "Activity complete" : "";
    this.inspectionObservationService.updateStorage(this.observation)
    if(this.checked) {
      this.onActivityComplete.emit(this.observation.ActivityId);
    }
  }
}
