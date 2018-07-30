import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfigurationService } from '../../../service/configuration.service';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent implements OnInit {
  files : FileList;

  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<PhotoDialogComponent>) {
  }

  ngOnInit() {
  }

  getFiles(event) {
    this.files = event.target.files; 
  }
}
