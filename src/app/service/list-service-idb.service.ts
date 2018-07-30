import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { Id } from '../model/Id';

export class ListServiceIdb<T extends Id> {
  protected loaded_list: Array<T>;
  protected list: BehaviorSubject<Array<T>>;
    
  constructor( public name: string,
      public config: ConfigurationService,
      public http: HttpClient) {

      let list = new Array<T>();
      this.list = new BehaviorSubject<Array<T>>(list);
      this.loaded_list = new Array<T>();

      this.getStorage();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Source / service

  public clearServiceData() {
      while(this.loaded_list.length > 0) {
          this.loaded_list.pop();
      }    
  }

  //get the data from a file or URL
  public getInputData() {
      // console.log('ListService.getInputData: ' + this.name);
      let url: string = this.config.dataUrl(this.name); 
      this.http.get(url).subscribe(
      (data: T[]) => {
          this.loaded_list = data;
          // console.log('ListService.getInputData event: ' + this.name);
          this.loaded_list.sort();
          this.list.next(this.loaded_list);
      },
      err => console.log(this.name + ' Service, Error loading ' + url + ': ' + err),
      () => { console.log(this.name + ' Service, loaded: ' + url);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Storage API

  //indexeddb add, put, get, delete

  private openDatabase(): IDBOpenDBRequest {
    var open = indexedDB.open(this.name, 1);
    var tableName = this.name;

    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore(tableName, {keyPath: "_id"});
        //var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
    };
    return open;
  }

  public getStorage() {
    var open: IDBOpenDBRequest = this.openDatabase();
    var tableName = this.name;
    
    var classLoadedList = this.loaded_list;
    var classList = this.list;

    open.onsuccess = function(e: Event) {
      var db = open.result;
      var tx = db.transaction(tableName, "readonly");
  
      var store = tx.objectStore(tableName);
      var list = store.getAll();

      list.onsuccess = function() {
        classLoadedList = list.result;
        classList.next(classLoadedList);
      };

      list.onerror = function() {
        console.log(list.result);
      };

      tx.oncomplete = function() {
        db.close();
      };
    };
  }

  public saveStorage() {
    var open: IDBOpenDBRequest = this.openDatabase();
    var tableName = this.name;
    var listData = this.loaded_list;

    open.onsuccess = function(e: Event) {
      var db = open.result;
      var tx = db.transaction(tableName, "readwrite");
  
      var store = tx.objectStore(tableName);
      listData.forEach(item => {
        var list = store.add(item);

        list.onsuccess = function() {
          console.log('Saves data ' + tableName);
        };
  
        list.onerror = function() {
          console.log('Could not save ' + tableName);
        };
      });

      tx.oncomplete = function() {
        db.close();
      };
    };
  }

  public updateStorage(item: T) {
    var open: IDBOpenDBRequest = this.openDatabase();
    var tableName = this.name;

    open.onsuccess = function(e: Event) {
      var db = open.result;
      var tx = db.transaction(tableName, "readwrite");
  
      var store = tx.objectStore(tableName);
      var list = store.put(item);

      list.onsuccess = function() {
        console.log('Saves data ' + tableName);
      };

      list.onerror = function() {
        console.log('Could not save ' + tableName);
      };

      tx.oncomplete = function() {
        db.close();
      };
    };
  }

  public updateStorageNewId(item: T) {
      item._id = this.config.uniqueID();
      item._rev = "";
      this.updateStorage(item);
  }

  public clearStorage() {
    var open: IDBOpenDBRequest = this.openDatabase();
    var tableName = this.name;

    open.onsuccess = function(e: Event) {
      var db = open.result;
      var tx = db.transaction(tableName, "read");
  
      var store = tx.objectStore(tableName);
      var list = store.clear();

      list.onsuccess = function() {
        console.log('Cleared ' + tableName);
      };

      list.onerror = function() {
        console.log('Could not clear ' + tableName);
      };

      tx.oncomplete = function() {
        db.close();
      };
    };
  }
  
  public getLoadedList(): Array<T> {
      return this.loaded_list;
  }
  
  public getList(): Observable<Array<T>> {
      return this.list;
  }
}
