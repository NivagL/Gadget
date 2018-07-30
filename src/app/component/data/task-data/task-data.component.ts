import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter'

import { Task } from '../../../model/task'
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css']
})
export class TaskDataComponent implements OnInit, OnDestroy {
  list: Observable<Array<Task>>;
  listSubscription;

  constructor(private taskService: TaskService) { 
  }

  ngOnInit() {
    this.list = this.taskService.getList();
    // this.listSubscription = this.list.subscribe();
  }

  ngOnDestroy(){
    if(this.listSubscription != undefined) {
      this.listSubscription.unsubscribe();
    }
  }

  public CodeText(activities: {Code:string, Version: number}[]):string {
    let ret: string = '';
    activities.forEach(a => {
      if(ret == '') {
        ret = a.Code + ' (' + a.Version + ')';
      } else {
        ret = ret + ', ' + a.Code + ' (' + a.Version + ')';
      }
    });
    return ret;
  }
}
