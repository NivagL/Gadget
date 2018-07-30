import { Component, ViewChild, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

import { Inspection } from '../../model/inspection'
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() onSelectedInspection: EventEmitter<Inspection>;
  @Output() onFilteredInspections: EventEmitter<Array<Inspection>>;

  private _inspections: Array<Inspection>;
  @Input() set inspections(list: Array<Inspection>) {
    if(list.length > 0) {
      this._inspections = list;
      this.dataSource = new MatTableDataSource(this._inspections);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    }
  }
  get inspections(): Array<Inspection> {
    return this._inspections;
  }
  
  private _selectedInspection: Inspection;
  @Input() set selectedInspection(item: Inspection) {
    // console.log('InspectionListComponent set selectedInspection: ' + JSON.stringify(item));
    this._selectedInspection = item;
  }
  get selectedInspection(): Inspection {
    return this._selectedInspection;
  }

  displayedColumns = ['GISID', 'Name', 'Enclosure', 'Status', 'Address'];
  statusFilter: string;
  enclosureFilter: string;
  addressFilter: string;

  pageSize: number;
  pageSizeOptions: number[];

  dataSource: MatTableDataSource<Inspection>;

  statusSelection: FormControl = new FormControl(this.statusFilter);
  status_list:Array<string> = ['pending', 'done', 'hold', 'cancelled'];    

  enclosureSelection: FormControl = new FormControl(this.enclosureFilter);
  enclosure_list:Array<string> = ['Fully Enclosed', 'Unknown', 'Canopy', 'Open', 'Integral'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private router: Router, 
    private media: MediaMatcher,
    private config: ConfigurationService
    ) {
    this.onSelectedInspection = new EventEmitter();  
    this.onFilteredInspections = new EventEmitter();
  }

  setSelectedColumns() {
    // if(this.media.matchMedia('(max-width: 480px)').matches) {
    //   this.displayedColumns = ['Status', 'Address'];
    // } 
    // if( this.media.matchMedia('(max-width: 768px)').matches ) {
    //   this.displayedColumns = ['GISID', 'Status', 'Address'];
    // }
    // if( this.media.matchMedia('(max-width: 1024px)').matches ) {
    //   this.displayedColumns = ['GISID', 'Name', 'Enclosure', 'Status', 'Address'];
    // }
    this.displayedColumns = this.config.getListColumns();
  }

  setPageSize() {
    this.pageSize = this.config.getListPageSize();
    this.pageSizeOptions = [Math.floor(this.pageSize / 2), this.pageSize, this.pageSize * 2];
  }

  ngOnInit() {
    this.setPageSize();
    this.setSelectedColumns()

    this.config.statusFilter.subscribe(status => {
      this.statusFilter = status;
      this.applyFilters();
    });

    this.config.addressFilter.subscribe(address => {
      this.addressFilter = address;
      this.applyFilters();
    });

    this.config.enclosureFilter.subscribe(enclosure => {
      this.enclosureFilter = enclosure;
      this.applyFilters();
    });
    
    this.applyFilters();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  onRow(data: Inspection) {
    if(this.selectedInspection.GISID == data.GISID) {
      this.router.navigate(['/inspection']);  
    }
    // console.log('InspectionListComponent.onRow: ' + JSON.stringify(data));
    this.onSelectedInspection.emit(data);
  }

  applyFilters() {
    if(this.dataSource == undefined) { return; }

    this.dataSource.filterPredicate = (data):boolean => {
      let match: boolean = true;
      if(this.addressFilter != undefined && this.addressFilter != "") {
        match = match && data.SiteAddress.toLowerCase().includes(this.addressFilter.toLocaleLowerCase());
      }
      if(this.enclosureFilter != undefined && this.enclosureFilter != "") {
        match = match && data.GCValue.toLowerCase() == this.enclosureFilter.toLocaleLowerCase();
      }
      if(this.statusFilter != undefined && this.statusFilter != "") {
        match = match && data.Status == this.statusFilter;
      }
      return match;
    };

    this.dataSource.filter = this.addressFilter + this.statusFilter + this.enclosureFilter;
    //if(this.dataSource.filteredData.length > 0) {
      setTimeout(() => this.onFilteredInspections.emit(this.dataSource.filteredData));
      setTimeout(() => this.onSelectedInspection.emit(this.dataSource.filteredData[0]));
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    // setTimeout(() => this.dataSource.sort = this.sort);
    //}
  }

  applyStatusFilter(statusFilter: string) {
    
    if(statusFilter == undefined || statusFilter.length == 0) {
      this.statusFilter = undefined;  
      this.config.setStatusFilter('');
    } else {
      this.config.setStatusFilter(this.statusFilter);
    }
  }

  applyAddressFilter(addressFilter: string) {

    if(addressFilter == undefined || addressFilter.length == 0) {
      this.addressFilter = undefined;  
      this.config.setAddressFilter('');
    } else {
      this.config.setAddressFilter(this.addressFilter);
    }
  }

  applyEnclosureFilter(enclosureFilter: string) {

    if(enclosureFilter == undefined || enclosureFilter.length == 0) {
      this.enclosureFilter = undefined;  
      this.config.setEnclosureFilter('');
    } else {
      this.config.setEnclosureFilter(this.enclosureFilter);
    }
  }
}
