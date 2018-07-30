import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public confirmMessage: string;
  public style: string;

  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }
}

