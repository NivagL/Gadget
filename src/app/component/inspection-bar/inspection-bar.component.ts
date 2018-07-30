import { Component, ViewChild, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { Inspection } from '../../model/inspection'
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-inspection-bar',
  templateUrl: './inspection-bar.component.html',
  styleUrls: ['./inspection-bar.component.css']
})
export class InspectionBarComponent implements OnInit {
  @Output() onSelectedInspection: EventEmitter<Inspection>;

  _inspections: Array<Inspection>;
  @Input() set inspections(data: Array<Inspection>){
    this._inspections = data;
  }
  get inspections(): Array<Inspection> {
    return this._inspections;
  }

  _selectedInspection: Inspection;
  @Input() set selectedInspection(data: Inspection) {
    this._selectedInspection = data;
  }
  get selectedInspection(): Inspection {
    // if(this.selectedInspection == undefined) {
    //   this.selectedInspection = this.inspections[0];
    // }
    return this._selectedInspection;
  }

  index: number = -1;

  constructor(private router: Router, 
    public config: ConfigurationService) {
      this.onSelectedInspection = new EventEmitter();
    }

  ngOnInit() {
    this.onNext();
  }

  onPrevious() {
    if(this.index > 0) {
      this.index -= 1;
    }
    this.selectedInspection = this.inspections[this.index];
    this.onSelectedInspection.emit(this.selectedInspection);
  }

  onNext() {
    if(this.index < this.inspections.length - 1) {
      this.index += 1;
    }
    this.selectedInspection = this.inspections[this.index];
    this.onSelectedInspection.emit(this.selectedInspection);
  }
  
}
