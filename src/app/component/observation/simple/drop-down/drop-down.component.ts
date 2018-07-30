import { Component, OnInit, Input, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //select colour
  selection: FormControl = new FormControl("red");
  item_list:string[] = ['red', 'yellow', 'blue'];    
}
