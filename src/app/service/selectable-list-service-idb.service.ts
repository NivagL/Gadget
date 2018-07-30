import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { Id } from '../model/Id';
import { ListServiceIdb } from './list-service-idb.service';

export class SelectableListServiceIdb <T extends Id> extends ListServiceIdb<T> {
  protected selected: BehaviorSubject<T>;

  constructor( public name: string,
      public config: ConfigurationService,
      public http: HttpClient) {
          super(name, config, http);

      let item = {} as T;
      this.selected = new BehaviorSubject<T>(item);
      this.list.subscribe(list => {
          if(list.length > 0) {
              this.setSelected(list[0]);
          }
      });
  }

  public getSelected(): Observable<T> {
      return this.selected;
  }

  public setSelected(selected: T) {
      if(this.loaded_list != undefined) {
          console.log(this.name + ' service setSelected: ' + JSON.stringify(selected));
          this.selected.next(selected);
      }
  }  
}
