import { Component, OnInit } from '@angular/core';
import { InputDataService } from '../../../service/input-data.service';

@Component({
  selector: 'app-input-data-page',
  templateUrl: './input-data-page.component.html',
  styleUrls: ['./input-data-page.component.css']
})
export class InputDataPageComponent implements OnInit {

  constructor(private service: InputDataService,
    ) { 
  }

  ngOnInit() {
  }
  
  onClear() {
    this.service.Clear();
  }

  onLoad() {
    this.service.Load();
  }

  onSave() {
    this.service.Save();
  }
}
