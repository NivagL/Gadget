import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AssessmentCode } from '../../../model/assessment-code';
import { AssessmentCodeService } from '../../../service/assessment-code.service';
import { InspectionObservation } from '../../../model/inspection-observation';

@Component({
  selector: 'app-code-picker',
  templateUrl: './code-picker.component.html',
  styleUrls: ['./code-picker.component.css']
})
export class CodePickerComponent implements OnInit {
  @Input() validCodes: Array<number>;
  @Input() selectedCode: number;
  // @Input() observation: InspectionObservation;
  @Output() onSelectedCode: EventEmitter<AssessmentCode>;
  
  codes: Observable<Array<AssessmentCode>>;

  constructor(private codeService: AssessmentCodeService) { 
    this.onSelectedCode = new EventEmitter();
  }

  ngOnInit() {
    this.codes = this.codeService.getList();
  }

  enabled(code: number): boolean {
    return this.validCodes.includes(code);
  }

  checked(code: number): boolean {
    return this.selectedCode == code;
  }

  getLabel(): string {
    this.codes.subscribe(list => {
      list.forEach(c => {
        if(this.selectedCode == c.CA) {
          return c.ShortText;
        }
      });
    });
    return "";
  }

  onClick(event: AssessmentCode) {
    if(event == undefined) {
      console.log('CodePickerComponent.onClick: no selection');
      this.selectedCode = -1;
      this.onSelectedCode.emit(undefined);
    } else {
      if(this.enabled(event.CA)) {
        console.log('CodePickerComponent.onClick: ' + JSON.stringify(event));
        this.selectedCode = event.CA;
        this.onSelectedCode.emit(event);
      }
    }
  }
}
