import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Observation } from '../../../model/observation'
import { ObservationService } from '../../../service/observation.service';


@Component({
  selector: 'app-observation-data',
  templateUrl: './observation-data.component.html',
  styleUrls: ['./observation-data.component.css']
})
export class ObservationDataComponent implements OnInit {
  list: Observable<Array<Observation>>;

  constructor(private observationService: ObservationService) { 
  }

  ngOnInit() {
    this.list = this.observationService.getList();
  }

  CodeText(codes: number[]): string{
    return codes.join(', ');
  }

}
