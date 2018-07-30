import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DateService } from './date.service'
import { Account } from '../model/account';
import PouchDB from 'pouchdb';

@Injectable()
export class ConfigurationService {

  public statusFilter_default: string = '';
  public addressFilter_default: string = '';
  public enclosureFilter_default: string = '';
  public workUrl_default: string = './assets/data/files/';
  public iconSize_default: string = 'material-icons md-18';
  public map_default: string = 'Default';
  public rotateImages_default: boolean = false;
  public iconSize: string;
  public listPageSize_default: number = 7;
  public listColumns_default: string[] = ['Name', 'Enclosure', 'Status', 'Address'];
  public statusFilter: BehaviorSubject<string>;
  public addressFilter: BehaviorSubject<string>;
  public enclosureFilter: BehaviorSubject<string>;
  public availableMaps: Array<string>;
  public selectedMap: BehaviorSubject<string>;
  statusLog: BehaviorSubject<Array<string>>;
  
  public account: Account;
  constructor(private dateService: DateService) { 
    let statusFilter = localStorage.getItem('StatusFilter');
    if(statusFilter == undefined) {
      localStorage.setItem('StatusFilter', this.statusFilter_default);
    }

    let addressFilter = localStorage.getItem('AddressFilter');
    if(addressFilter == undefined) {
      localStorage.setItem('AddressFilter', this.addressFilter_default);
    }

    let enclosureFilter = localStorage.getItem('EnclosureFilter');
    if(enclosureFilter == undefined) {
      localStorage.setItem('EnclosureFilter', this.enclosureFilter_default);
    }

    let selectedMap = localStorage.getItem('SelectedMap');
    if(selectedMap == undefined) {
      localStorage.setItem('SelectedMap', this.map_default);
    }

    this.availableMaps = new Array<string>();
    this.availableMaps.push('Default');
    // this.availableMaps.push('GoogleSDK');
    // this.availableMaps.push('GoogleAGM');
    this.availableMaps.push('ArcGIS');

    this.statusFilter = new BehaviorSubject<string>(this.getStatusFilter());
    this.addressFilter = new BehaviorSubject<string>(this.getAddressFilter());
    this.enclosureFilter = new BehaviorSubject<string>(this.getEnclosureFilter());
    
    this.selectedMap = new BehaviorSubject<string>(this.getSelectedMap());

    let started = dateService.getTime() + ': Inspection Gadget Started';
    this.statusLog = new BehaviorSubject<Array<string>>([started]);

    this.iconSize = localStorage.getItem('iconSize');
    if(this.iconSize == undefined) {
      this.iconSize = this.iconSize_default;
      localStorage.setItem('iconSize', this.iconSize_default);
    }

    let workUrl = localStorage.getItem('workUrl');
    if(workUrl == undefined) {
      localStorage.setItem('workUrl', this.workUrl_default);
    }

    let listPageSize = localStorage.getItem('listPageSize');
    if(listPageSize == undefined) {
      localStorage.setItem('listPageSize', this.listPageSize_default.toString());
    }

    let listColumns = localStorage.getItem('listColumns');
    if(listColumns == undefined) {
      localStorage.setItem('listColumns', this.listColumns_default.join(','));
    }

    let rotateImages = localStorage.getItem('rotateImages');
    if(rotateImages == undefined) {
      localStorage.setItem('rotateImages', this.rotateImages_default? 'true' : 'false');
    }

    this.account = new Account();
    this.account._id = 'Account';

    let db = new PouchDB('config');
    db.get("Account")
    .then(result => {
      this.account = result;
      this.account._id = result._id;
      this.account._rev = result._rev;
      this.statusLog.next(['Loaded account ' + this.account.Inspector]);
      //console.log('loaded account: ' + JSON.stringify(this.account));
    })
    .catch(err => {
      console.log(err);
      
      console.log('using account defaults...');
      //use a default
      this.account = new Account();
      this.account.Inspector = 'Jeff Goldblum';
      this.account.EMail = 'geoff.goldblum@northpower.com';
      this.account.Phone = '022 555 7777';
      this.account.Mobile = '021 666 8889';
      this.account.Network = 'Vector';
      this.account._id = "Account";
      this.account._rev = "";
      this.SaveAccount();
    });
  }

  private chr4(){
    return Math.random().toString(16).slice(-4);
  }

  public uniqueID(){
    return this.chr4() + this.chr4() +
      '-' + this.chr4() +
      '-' + this.chr4() +
      '-' + this.chr4() +
      '-' + this.chr4() + this.chr4() + this.chr4();
  }

  public log(logEntry: string) {
    let sub = this.statusLog.subscribe(l => {
      l.push( this.dateService.getTime() + ': ' +logEntry)
    });
    sub.unsubscribe();
  }
  
  public getStatusLog(): Observable<Array<string>> {
    return this.statusLog;
  }
  
  public setListColumns(listColumns: string[]) {
    localStorage.setItem('listColumns', listColumns.join(','));
  }

  public getListColumns(): string[] {
    return localStorage.getItem('listColumns').split(',');
  }

  public setListPageSize(pageSize: number) {
    localStorage.setItem('listPageSize', pageSize.toString());
  }

  public getListPageSize(): number {
    return +localStorage.getItem('listPageSize');
  }
  
  public setWorkUrl(url: string) {
    localStorage.setItem('workUrl', url);
  }

  public getWorkUrl(): string {
    return localStorage.getItem('workUrl');
  }

  public getIconSize(): string {
    this.iconSize = localStorage.getItem('iconSize');
    return this.iconSize;
  }

  public setIconSize(size: string) {
    localStorage.setItem('iconSize', size);
  }
  
  public getShowMapLocation(): boolean {
    return localStorage.getItem('showMapLocation') == 'true';
  }
    
  public setShowMapLocation(show: boolean) {
    localStorage.setItem('showMapLocation', show ? 'true' : 'false');
  }

  public getWorkOrderId(): number {
    return +localStorage.getItem('workOrderId');
  }
  public setWorkOrderId(id: number) {
    localStorage.setItem('workOrderId', id.toString());
  }

  public getStatusFilter(): string {
    return localStorage.getItem('StatusFilter');
  }

  public setStatusFilter(status: string) {
    localStorage.setItem('StatusFilter', status);
    this.statusFilter.next(status);
  }

  public getAddressFilter(): string {
    return localStorage.getItem('AddressFilter');
  }

  public setAddressFilter(address: string) {
    localStorage.setItem('AddressFilter', address);
    this.addressFilter.next(address);
  }

  public getEnclosureFilter(): string {
    return localStorage.getItem('EnclosureFilter');
  }

  public setEnclosureFilter(enclosure: string) {
    localStorage.setItem('EnclosureFilter', enclosure);
    this.enclosureFilter.next(enclosure);
  }

  public getSelectedMap(): string {
    return localStorage.getItem('SelectedMap');
  }

  public setSelectedMap(map: string) {
    localStorage.setItem('SelectedMap', map);
    this.selectedMap.next(map);
  }
  
  public getRotateImages(): boolean {
    return localStorage.getItem('rotateImages') == 'true';
  }
    
  public setRotateImages(show: boolean) {
    localStorage.setItem('rotateImages', show.toString());
  }
  
  SaveAccount() {
    let db = new PouchDB('config');
    console.log('saving :' + JSON.stringify(this.account));
    db.put(this.account)
    .then(result => {
      // console.log('result :' + JSON.stringify(result));
      this.account._rev = result.rev;
      console.log('saved :' + JSON.stringify(this.account));
    })
    .catch(err => {
      console.log('error :' + err + JSON.stringify(this.account));
    });            
  }

  public dataUrl(type: string): string{
    if(this.getWorkUrl().toLowerCase().includes('file')) {
      return this.getWorkUrl() + type + '.json';
    } else {
      return this.getWorkUrl() + type;
    }
  }

}
