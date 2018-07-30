import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Inspection } from '../../../model/inspection'
import { WorkPack } from '../../../model/work-pack'
import { WorkPackService } from '../../../service/work-pack.service'
import { ConfigurationService } from '../../../service/configuration.service'
import { FilteredInspectionService } from '../../../service/filtered-inspection.service'

@Component({
  selector: 'app-inspection-list-page',
  templateUrl: './inspection-list-page.component.html',
  styleUrls: ['./inspection-list-page.component.css']
})
export class InspectionListPageComponent implements OnInit {
  workPack: Observable<WorkPack>;
  inspections: Observable<Array<Inspection>>;
  selectedInspection: Observable<Inspection>;
  filteredInspections: BehaviorSubject<Array<Inspection>>;
  selectedMap: string;

  constructor(private config: ConfigurationService,
    private workPackService: WorkPackService,
    private inspectionService: FilteredInspectionService) { 
    this.filteredInspections = new BehaviorSubject<Array<Inspection>>(new Array<Inspection>());
  }

  ngOnInit() {
    this.workPack = this.workPackService.getSelected();
    this.inspections = this.inspectionService.getList();
    this.selectedInspection = this.inspectionService.getSelected();
    this.config.selectedMap.subscribe(map => {
      this.selectedMap = map;
    });
  }

  onSelectedInspection(data: Inspection) {
    this.inspectionService.setSelected(data);
  }

  onFilteredInspections(data: Array<Inspection>) {
    this.filteredInspections.next(data);
  }
}
