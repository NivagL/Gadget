import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigDialogComponent } from './component/config-dialog/config-dialog.component'
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component'
import { AccountDialogComponent } from './component/account-dialog/account-dialog.component'
import { AccessDialogComponent } from './component/access-dialog/access-dialog.component'

import { WorkPack } from './model/work-pack'
import { Inspection } from './model/inspection'
import { Account } from './model/account'
import { AccessDetails } from './model/access'
// import { InspectionStatus } from './model/inspection-status'

import { ConfigurationService } from './service/configuration.service';
import { InspectionService } from './service/inspection.service';
import { WorkPackService } from './service/work-pack.service';
// import { InspectionStatusService } from './service/inspection-status.service';
import { InputDataService } from './service/input-data.service';
import { OutputDataService } from './service/output-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Northpower Inspection Gadget';

  public inspection: Observable<Inspection>;
  public inspectionSubscription;

  public workOrder: Observable<WorkPack>;
  public workOrderSubscription;

  public latitude = -1;
  public longitude = -1;

  configDialogRef: MatDialogRef<ConfigDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  accountDialogRef: MatDialogRef<AccountDialogComponent>;
  accessDialogRef: MatDialogRef<AccessDialogComponent>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor( 
    public dialog: MatDialog, 
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    public config: ConfigurationService,
    private inspectionService: InspectionService,
    private workOrderService: WorkPackService,
    private inputDataService: InputDataService,
    private outputDataService: OutputDataService,
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // navigator.geolocation.getCurrentPosition(result =>{
    //   this.latitude = +result.coords.latitude.toFixed(6);
    //   this.longitude = +result.coords.longitude.toFixed(6);;
    // })
  }

  ngOnInit() {
    this.inspection = this.inspectionService.getSelected();
    this.workOrder = this.workOrderService.getSelected();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

    if(this.inspectionSubscription != undefined) {
      this.inspectionSubscription.unsubscribe();
    }

    if(this.workOrderSubscription != undefined) {
      this.workOrderSubscription.unsubscribe();
    }
  }

  onHome() {
    this.router.navigate(['/work']);  
  }

  onWork() {
    this.router.navigate(['/work']);  
  }

  onList() {
    this.router.navigate(['/list']);  
  }

  onInspection() {
    this.router.navigate(['/inspection']);  
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onSync() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to synchronise?'
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.config.log('Synchronising');

        this.inputDataService.Clear();
        this.outputDataService.Clear();
    
        this.delay(10000);
    
        this.inputDataService.Load();
        this.delay(500);
        this.inputDataService.Save();
        
        this.delay(10000);
        this.outputDataService.GenerateInspections();
      }
      this.confirmDialogRef = null;
    });
  }
  
  openConfigDialog() {
    this.configDialogRef = this.dialog.open(ConfigDialogComponent, {
      position: {top: '0%'}, width: '75%'
    });
    this.configDialogRef.componentInstance.workUrl = this.config.getWorkUrl();
    this.configDialogRef.componentInstance.iconSize = this.config.getIconSize();
    this.configDialogRef.componentInstance.rotateImages = this.config.getRotateImages();
    this.configDialogRef.componentInstance.NumberListItems = this.config.getListPageSize();
    this.configDialogRef.componentInstance.ListColumns = this.config.getListColumns().join(',');
    this.configDialogRef.componentInstance.showMapLocation = this.config.getShowMapLocation();

    this.configDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.config.setWorkUrl(this.configDialogRef.componentInstance.workUrl);
        this.config.setIconSize(this.configDialogRef.componentInstance.iconSize);
        this.config.setRotateImages(this.configDialogRef.componentInstance.rotateImages);
        this.config.setListPageSize(this.configDialogRef.componentInstance.NumberListItems);
        this.config.setListColumns(this.configDialogRef.componentInstance.ListColumns.split(','));
        this.config.setShowMapLocation(this.configDialogRef.componentInstance.showMapLocation);
        this.config.setSelectedMap(this.configDialogRef.componentInstance.selectedMap.value);
      }
      this.configDialogRef = null;
    });
  }

  openAccountDialog() {
    let account = new Account();
    account.Inspector = this.config.account.Inspector;
    account.EMail = this.config.account.EMail;
    account.Phone = this.config.account.Phone;
    account.Mobile = this.config.account.Mobile;
    account.Network = this.config.account.Network;
    account._id = this.config.account._id;
    account._rev = this.config.account._rev;

    this.accountDialogRef = this.dialog.open(AccountDialogComponent, {
      position: {top: '0%'}, width: '75%'
    });
    this.accountDialogRef.componentInstance.account = account;

    this.accountDialogRef.afterClosed().subscribe((result:boolean) => {
      if(result) {
        this.config.account = this.accountDialogRef.componentInstance.account;
        this.config.SaveAccount();
      }
      this.accountDialogRef = null;
    });
  }

  onBack() {
    if(this.router.isActive('/work', true)) {
    }
    if(this.router.isActive('/list', true)) {
      this.router.navigate(['/work']);  
    }
    if(this.router.isActive('/inspection', true)) {
      this.router.navigate(['/list']);  
    }
  }

  //Debug toolbar
  onInputData() {
    this.router.navigate(['/input']);  
  }

  onOutputData() {
    this.router.navigate(['/output']);  
  }

  onTest() {
    this.router.navigate(['/test']);  
  }

  onPendingList() {
    this.config.setStatusFilter('pending')
    this.router.navigate(['/list']);  
  }  

  onCompleteList() {
    this.config.setStatusFilter('done')
    this.router.navigate(['/list']);  
  }  
  
  onHoldList() {
    this.config.setStatusFilter('hold')
    this.router.navigate(['/list']);  
  }  

  onCancelledList() {
    this.config.setStatusFilter('cancelled')
    this.router.navigate(['/list']);  
  }  
}
