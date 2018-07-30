import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-capacitance-stage',
  templateUrl: './capacitance-stage.component.html',
  styleUrls: ['./capacitance-stage.component.css']
})
export class CapacitanceStageComponent implements OnInit {

  @Input() stage:string;
  @Input() step:number;

  red_serial_number:string;
  red_measured:number;
  red_actual:number;

  yellow_serial_number:string;
  yellow_measured:number;
  yellow_actual:number;
  
  blue_serial_number:string;
  blue_measured:number;
  blue_actual:number;

  constructor() { }

  ngOnInit() {
  }

}
