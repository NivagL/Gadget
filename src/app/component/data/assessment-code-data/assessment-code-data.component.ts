import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AssessmentCode } from '../../../model/assessment-code'
import { AssessmentCodeService } from '../../../service/assessment-code.service'

@Component({
  selector: 'app-assessment-code-data',
  templateUrl: './assessment-code-data.component.html',
  styleUrls: ['./assessment-code-data.component.css']
})
export class AssessmentCodeDataComponent implements OnInit {
  list: Observable<Array<AssessmentCode>>;

  constructor(private assessmentCodeService:AssessmentCodeService) { }

  ngOnInit() {
    this.list = this.assessmentCodeService.getList();
  }

  ngOnDestroy() {
  }
}
