import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection } from '../../../model/inspection';
import { FilteredInspectionService } from '../../../service/filtered-inspection.service';

@Component({
  selector: 'app-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.css']
})
export class InspectionPageComponent implements OnInit {
  inspection: Observable<Inspection>;

  constructor(private inspectionService: FilteredInspectionService) { 
  }

  ngOnInit() {
    this.inspection = this.inspectionService.getSelected();
  }
}
