import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-capacitor-bank-inspection',
  templateUrl: './capacitor-bank-inspection.component.html',
  styleUrls: ['./capacitor-bank-inspection.component.css']
})
export class CapacitorBankInspectionComponent implements OnInit {
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;
  formGroup7: FormGroup;
  formGroup8: FormGroup;
  formGroup9: FormGroup;

  constructor(private _formBuilder: FormBuilder){ 
  }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      ctrl1: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      ctrl2: ['', Validators.nullValidator]
    });
    this.formGroup3 = this._formBuilder.group({
      ctrl3: ['', Validators.required]
    });
    this.formGroup4 = this._formBuilder.group({
      ctrl4: ['', Validators.required]
    });
    this.formGroup5 = this._formBuilder.group({
      ctrl5: ['', Validators.required]
    });
    this.formGroup6 = this._formBuilder.group({
      ctrl6: ['', Validators.required]
    });
    this.formGroup7 = this._formBuilder.group({
      ctrl7: ['', Validators.required]
    });
    this.formGroup8 = this._formBuilder.group({
      ctrl8: ['', Validators.required]
    });
    this.formGroup9 = this._formBuilder.group({
      ctrl9: ['', Validators.required]
    });
  }
}
