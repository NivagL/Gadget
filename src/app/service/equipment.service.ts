import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list-service'
import { SelectableListService } from './selecteable-list-service'

import { ConfigurationService } from './configuration.service';
import { Equipment } from '../model/equipment'

@Injectable()
//export class EquipmentService extends SelectableListService<Equipment> {
export class EquipmentService extends ListService<Equipment> {

  constructor(config: ConfigurationService, 
    http: HttpClient) {
    super('Equipment', config, http);
  }

  getEquipment(id:number) {
    return this.loaded_list.find(e => e._id == id.toString());
  }
}
