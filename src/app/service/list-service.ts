import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { Id } from '../model/Id';
import PouchDB from 'pouchdb';

export class ListService<T extends Id> {
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
    public getStorage() {
        // console.log('ListService.getStorage: ' + this.name);
        let db = new PouchDB(this.name);
        db.allDocs({include_docs: true}).then(result => {
            return Promise.all(result.rows.map(row => {
                // console.log('ListService.getStorage item: ' + JSON.stringify(row));
                let item: T = {} as T;
                item = row.doc; 
                item._id = row.id;
                item._rev = row.value.rev;
                // console.log('ListService.getStorage result: ' + JSON.stringify(item));
                return item;
            }));
        }).then(list => {
            this.loaded_list = list;
            // console.log('ListService.getStorage event: ' + this.name);
            this.list.next(list);
        })
        .catch(err => {
            console.log('ListService.getStorage ERROR: ' + this.name + ' ' + err);
        });
    }

    public saveStorage() {
        // console.log('ListService.saveStorage: ' + this.name);
        let db = new PouchDB(this.name);
        this.loaded_list.forEach((item: T) => {
            // console.log('ListService.saveStorage item:' + JSON.stringify(item));
            db.put(item)
            .then(result => {
                item._id = result.id;
                item._rev = result.rev;
                // console.log('ListService.saveStorage result:' + JSON.stringify(item));
            })
            .catch(err => {
                console.log('ListService.saveStorage ERROR: ' + this.name + ' ' + err);
            });            
        });
    }

    public updateStorage(item: T) {
        let db = new PouchDB(this.name);
        // console.log('ListService.updateStorage item: ' + JSON.stringify(item));
        db.put(item)
        .then(result => {
            // console.log('saved :' + JSON.stringify(item));
            // console.log('result :' + JSON.stringify(result));
            item._id = result.id;
            item._rev = result.rev;
            // console.log('ListService.updateStorage result: ' + JSON.stringify(item));
        })
        .catch(err => {
            console.log('ListService.updateStorage ERROR: ' + this.name + ' ' + err);
        });            
    }

    public updateStorageNewId(item: T) {
        item._id = this.config.uniqueID();
        item._rev = "";
        this.updateStorage(item);
    }
    
    public clearStorage() {
        new PouchDB(this.name).destroy()
        .then(() => {
            console.log('Pouch DB dropped ' + this.name);
        }).catch(function (err) {
            console.log('ListService.clearStorage ERROR: ' + this.name + ' ' + err);
        })
    }
    
    public getLoadedList(): Array<T> {
        return this.loaded_list;
    }
    
    public getList(): Observable<Array<T>> {
        return this.list;
    }
}