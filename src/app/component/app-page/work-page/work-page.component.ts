import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WorkPack } from '../../../model/work-pack'
import { WorkPackService } from '../../../service/work-pack.service'

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit {
  workPacks: Observable<Array<WorkPack>>;
  selectedPack: Observable<WorkPack>;

  constructor(private workPackService: WorkPackService) { 
  }

  ngOnInit() {
    this.workPacks = this.workPackService.getList();
    this.selectedPack = this.workPackService.getSelected();
    this.selectedPack.subscribe(w => {
      console.log('work-page.onInit: ' + JSON.stringify(w));
    });
  }

  onSelected($event: WorkPack) {
    console.log('work-page.onSelected: ' + JSON.stringify($event));
    this.workPackService.setSelected($event);
  }
}
