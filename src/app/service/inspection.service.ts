import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, zip } from 'rxjs';
//import { ListService } from './list-service'
//import { ListServiceIdb } from './list-service-idb.service';
import { SelectableListService } from './selecteable-list-service'
import { SelectableListServiceIdb } from './selectable-list-service-idb.service'

import { Inspection } from '../model/inspection'
import { Task } from '../model/task'
import { Equipment } from '../model/equipment'
import { Location } from '../model/location'
import { WorkPack } from '../model/work-pack'
import { Activity } from '../model/activity'
import { Observation } from '../model/observation'

import { TaskService } from './task.service';
import { EquipmentService } from './equipment.service';
import { ConfigurationService } from './configuration.service';
import { WorkPackService } from './work-pack.service';
import { ActivityService } from './activity.service';
import { ObservationService } from './observation.service';
import { InspectionActivity } from '../model/inspection-activity';
import { InspectionActivityService } from './inspection-activity.service';
import { InspectionObservationService } from './inspection-observation.service';
import { DateService } from './date.service';

@Injectable()
export class InspectionService extends SelectableListServiceIdb<Inspection> {
  // private workPack: Observable<WorkPack>;
  // private workPackSubscription;

  // private filteredList: BehaviorSubject<Array<Inspection>>;
  
  constructor(public config: ConfigurationService,
    public http: HttpClient,
    private dateService: DateService,
    private workPackService: WorkPackService,
    private taskService: TaskService,
    private equipmentService: EquipmentService,
    private activityService: ActivityService,
    private observationService: ObservationService,
    private inspectionActivityService: InspectionActivityService) {
    super('Inspection', config, http);

    // this.filteredList = new BehaviorSubject<Array<Inspection>>(new Array<Inspection>());

    // //initial load
    // let loadEvents = Observable.zip(
    //   this.list, this.workPackService.getSelected()
    // ); 

    // let loadSubscription = loadEvents.subscribe(([i, w])=>{
    //   console.log('Total inspections: ' + this.loaded_list.length);
    //   let filteredList = this.loaded_list.filter(i => i.WorkOrderId.toString() == w._id);
    //   console.log('Filtered inspections: ' + this.loaded_list.length);
    //   this.filteredList.next(filteredList); 
    //   this.setSelected(this.filteredList[0]);
    // });

    // //switching work packs
    // this.workPack = this.workPackService.getSelected();
    // this.workPackSubscription = this.workPack.subscribe(w => {
    //   console.log('Total inspections: ' + this.loaded_list.length);
    //   let filteredList = this.loaded_list.filter(i => i.WorkOrderId.toString() == w._id);
    //   console.log('Filtered inspections: ' + this.loaded_list.length);
    //   this.filteredList.next(filteredList); 
    //   this.setSelected(this.filteredList[0]);
    // });
  }

  // public getFilteredList(): Observable<Array<Inspection>> {
  //   return this.filteredList;
  // }

  // public setFilteredList(newList: Array<Inspection>) {
  //   this.filteredList.next(newList);
  //   this.setSelected(newList[0]);
  // }

  // public resetFilteredList() {
  //   // if(this.workOrderSubscription != undefined) {
  //   //   this.workOrderSubscription.unsubscribe();
  //   // }
  //   // this.workOrderSubscription = this.workOrder.subscribe(w => {
  //   //   this.filteredList.next(this.loaded_list
  //   //     .filter(i => i.WorkOrderId.toString() == w._id)) 
  //   //     this.setSelected(this.filteredList[0]);
  //   // });
  // }
  
  public getCount(workorderid:string, status: string): number {
    let count: number = 0;

    //from the loaded list...
    if(this.loaded_list == undefined || workorderid == undefined 
      || status == undefined ||this.loaded_list.length == 0 ) {
      return 0;
    }

    this.loaded_list.forEach(i => {
      if(i.WorkOrderId.toString() == workorderid && i.Status == status){
       count += 1; 
      }
    });

    return count;
  }

  createInspections() {
    console.log('Creating inspections...');

    const dependents = zip(
      this.workPackService.getList(),
      this.taskService.getList(),
      this.equipmentService.getList(),
      this.activityService.getList(),
      this.observationService.getList(),
    );

    //let idSeed: number = +(Date.now());
    dependents.subscribe(([work, tasks, equipment, activities, observation]) => {
      // console.log(work.length + ' work orders');
      work.forEach(w => {
        // console.log('Create inspection work order ' + w._id);
        tasks.forEach(t => {
          if(t.WorkOrderId.toString() == w._id) {
            // console.log('Create inspection work order ' + w._id + ' task ' + t._id);

            let e: Equipment = equipment.find(equip => equip.GISID == t.GISID);
            if(e == undefined) {
              console.log('Error, could not find equipment ' + t.GISID + ' for task ' + t._id + ' N3: ' + t.N3ID);
              return;
            }
            // console.log('Create inspection work order ' + w._id + ' task ' + t._id + ' equipment ' + e._id);
          
            //create an inspection if needed
            let i: Inspection = this.loaded_list.find(insp => 
              insp.WorkOrderId.toString() == w._id 
              && insp.TaskId.toString() == t._id);
            if(i == undefined) {
              i = new Inspection();
              i.WorkOrderId = +w._id;
              i.TaskId = +t._id;
              i.EquipmentId = +e._id;
              i.Type = e.Type;
              i.SiteAddress = e.SiteAddress;
              i.GISID = e.GISID;
              i.Name = e.Name;
              i.GCValue = e.GCValue;
              i.Location = new Location();
              i.Location.Lat = e.Location.Lat;
              i.Location.Lng = e.Location.Lng;
              i.Inspector = this.config.account.Inspector;
              i.CreatedOn = this.dateService.FormatDate(new Date());
              i.Status = 'pending';
              //i._id = (++idSeed).toString();
              super.updateStorageNewId(i);
              console.log('new inspection : ' + i._id + ' / ' + i._rev);
              this.loaded_list.push(i);
              //console.log('Created inspection work order ' + w._id + ' task ' + t._id + ' new inspection ' + i._id);
            }

            // create the inspection activities if needed
            // the activity creates the inspection observations
            t.Activities.forEach(ta => {
              let a: Activity = activities.find(act => act.Code == ta.Code && act.Version == ta.Version);
              if(a == undefined) {
                console.log('Error, could not find activity ' + ta  + ' for task ' + t._id + ' N3: ' + t.N3ID);
                return;
              }

//              console.log('Create inspection work order ' + w._id + ' task ' + t._id + ' inspection ' + i._id + ' activity ' + a.Code);
              this.inspectionActivityService.create(+w._id, +t._id, +e._id, i._id, a);
            })
          }
        })
      })
      this.list.next(this.loaded_list);
      this.selected.next(this.loaded_list[0]);
    });
  }

}