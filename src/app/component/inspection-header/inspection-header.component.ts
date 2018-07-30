import { Component, OnInit, Input } from '@angular/core';
import { Inspection } from '../../model/inspection';

@Component({
  selector: 'app-inspection-header',
  templateUrl: './inspection-header.component.html',
  styleUrls: ['./inspection-header.component.css']
})
export class InspectionHeaderComponent implements OnInit {
  @Input() inspection: Inspection;

  constructor() { 
  }

  ngOnInit() {
  }
}
