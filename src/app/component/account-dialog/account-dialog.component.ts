import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Account } from '../../model/account';
import { ConfigurationService } from '../../service/configuration.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  account: Account;

  operators = [
    {value: 'Vector', viewValue: 'Vector'},
    {value: 'Wellington', viewValue: 'Wellington'},
    {value: 'Whangarei', viewValue: 'Whangarie'},
    {value: 'Powerco', viewValue: 'PowerCo'},
  ];

  constructor( public config: ConfigurationService,
    public dialogRef: MatDialogRef<AccountDialogComponent>) { 
  }

  ngOnInit() {
  }

}
