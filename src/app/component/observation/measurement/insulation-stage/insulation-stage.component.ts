import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-insulation-stage',
  templateUrl: './insulation-stage.component.html',
  styleUrls: ['./insulation-stage.component.css']
})
export class InsulationStageComponent implements OnInit {

  @Input() stage:string;

  red_serial_number:string;
  red_contact_resistance:number;
  red_insulation_resistance1:number;
  red_insulation_resistance2:number;

  yellow_serial_number:string;
  yellow_contact_resistance:number;
  yellow_insulation_resistance1:number;
  yellow_insulation_resistance2:number;

  blue_serial_number:string;
  blue_contact_resistance:number;
  blue_insulation_resistance1:number;
  blue_insulation_resistance2:number;

  constructor() { }

  ngOnInit() {
  }

}
