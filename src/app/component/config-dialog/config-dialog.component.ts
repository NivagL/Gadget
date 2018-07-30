import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationService } from '../../service/configuration.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css']
})
export class ConfigDialogComponent implements OnInit {
  public workUrl: string;
  public iconSize: string;
  public rotateImages: boolean;
  public NumberListItems: number;
  public ListColumns: string;
  public showMapLocation: boolean;

  selectedMap: FormControl = new FormControl("Default");
  
  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<ConfigDialogComponent>) {
  }

  ngOnInit() {
  }

}
