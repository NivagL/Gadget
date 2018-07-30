import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Inspection } from '../../model/inspection';
import { WorkPack } from '../../model/work-pack';
import { InspectionService } from '../../service/inspection.service';
import { WorkPackService } from '../../service/work-pack.service';
import { ConfigurationService } from '../../service/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection-status',
  templateUrl: './inspection-status.component.html',
  styleUrls: ['./inspection-status.component.css']
})
export class InspectionStatusComponent implements OnInit {
  @Input() selectedPack: WorkPack;
  @Input() workPack: WorkPack;
  

  constructor(private router: Router,
    private config: ConfigurationService,
    private inspectionService: InspectionService) { 
  }

  ngOnInit() {
  }

  getCount(workorderid:string, status: string){
    return this.inspectionService.getCount(this.workPack._id, status);
  }

  onClick(selected: WorkPack, data: string) {
    if(this.selectedPack != undefined 
      && selected._id == this.selectedPack._id) {
      //alert(selected._id + ': ' + data);
      this.config.setStatusFilter(data);
      this.config.setAddressFilter('');
      this.router.navigate(['/list']);  
    }
  }

  onTitleClick() {
    this.router.navigate(['/work']);
  }
}
