import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Equipment } from '../../../model/equipment'
import { EquipmentService } from '../../../service/equipment.service'

@Component({
  selector: 'app-equipment-data',
  templateUrl: './equipment-data.component.html',
  styleUrls: ['./equipment-data.component.css']
})
export class EquipmentDataComponent implements OnInit, OnDestroy {
  list: Observable<Array<Equipment>>;

  constructor(private equipmentService:EquipmentService) { }

  ngOnInit() {
    this.list = this.equipmentService.getList();
  }

  ngOnDestroy() {
  }
}
