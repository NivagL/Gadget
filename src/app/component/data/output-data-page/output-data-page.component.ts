import { Component, OnInit } from '@angular/core';
import { OutputDataService } from '../../../service/output-data.service';

@Component({
  selector: 'app-output-data-page',
  templateUrl: './output-data-page.component.html',
  styleUrls: ['./output-data-page.component.css']
})
export class OutputDataPageComponent implements OnInit {

  constructor(
    private service: OutputDataService,
    ) { 

  }

  ngOnInit() {
  }

  onClear() {
    this.service.Clear();
  }

  onInspections() {
    this.service.GenerateInspections();
  }

  onSave() {
    this.service.Save();
  }
  
}
