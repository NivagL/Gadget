import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WorkPack } from '../../model/work-pack';
import { WorkPackService } from '../../service/work-pack.service';

@Component({
  selector: 'app-sync-progress',
  templateUrl: './sync-progress.component.html',
  styleUrls: ['./sync-progress.component.css']
})
export class SyncProgressComponent implements OnInit {
  InspectionTotal: number;
  InspectionProgress: number;

  ActivityTotal: number;
  ActivityProgress: number;

  ObservationTotal: number;
  ObservationProgress: number;

  PhotoTotal: number;
  PhotoProgress: number;

  item: Observable<WorkPack>;
  statusLog: Observable<Array<string>>;

  constructor(private workOrderService: WorkPackService) { 
  }

  ngOnInit() {
      this.item = this.workOrderService.getSelected();

      this.InspectionTotal = 45;
      this.InspectionProgress = 20;

      this.ActivityTotal = 95;
      this.ActivityProgress = 50;
      
      this.ObservationTotal = 450;
      this.ObservationProgress = 30;
      
      this.PhotoTotal = 30;
      this.PhotoProgress = 5;
    }
}
