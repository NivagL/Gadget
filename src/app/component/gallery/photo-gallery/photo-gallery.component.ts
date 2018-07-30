import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ConfigurationService } from '../../../service/configuration.service';

import PouchDB from 'pouchdb';

import { Inspection } from '../../../model/inspection';
import { PhotoDialogComponent } from './../photo-dialog/photo-dialog.component';
import { InspectionPhoto } from '../../../model/inspection-photo';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  photoDialogRef: MatDialogRef<PhotoDialogComponent>;
  inspection: Inspection;

  photoList: BehaviorSubject<Array<InspectionPhoto>>;
  currentUrl: BehaviorSubject<SafeResourceUrl>;
  currentIndex: number;
  length: number;
  rotate: string;
  anchor: HTMLAnchorElement;

  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public dialog: MatDialog,
    public domSanitiser: DomSanitizer) {

    this.photoList = new BehaviorSubject<Array<InspectionPhoto>>(new Array<InspectionPhoto>());
    this.currentUrl = new BehaviorSubject<string>('');
    this.currentIndex = 0;
    this.length = 0;
    this.rotate = this.config.getRotateImages() ? "rotate90" : ""; 

    //TODO **GL** trying iPad fix
    this.anchor = document.createElement("a");
  }

  ngOnInit() {
    var localdb = new PouchDB('inspection-photo');
    localdb.info().then(info => {
      console.log('db info: ' + JSON.stringify(info));
    });

    let db = new PouchDB('inspection-photo');
    // db.allDocs({ include_docs: true, attachments: true })
    db.allDocs({include_docs: true})
    .then(result => {
      return Promise.all(result.rows.map(row => {
      // console.log('gallery processing photo: ' + JSON.stringify(row));
      // alert('gallery processing photo: ' + JSON.stringify(row));
      let item = new InspectionPhoto();
      item = row.doc;
      item._id = row.id;
      item._rev = row.rev;
      // if(item.Photo == undefined) {
      //   item.Photo = row.attachments['image.jpg'].data;
      // }
      //item.Photo = new File
      return item;
      }));
    }).then(list => {
      this.length = list.length;
      this.currentIndex = 0; 
      this.photoList.next(list);
      if(list.length > 0) {
        this.getImageUrl(list[0]);
      }
    })
    .catch(err => {
      console.log('ngOnInit db error' + err);
      alert('ngOnInit db error' + err);
    });

  }

  public getImageUrl(inspectionPhoto: InspectionPhoto): void {
    if(inspectionPhoto == undefined 
      || inspectionPhoto.Photo == undefined){ 
      return; }

    // alert('blob size: ' + inspectionPhoto.Photo.size);

    let modified: Date = new Date();
    let f:File = new File([inspectionPhoto.Photo], 
      "image" + this.currentIndex + ".jpg", 
      {type: "image/jpeg", lastModified: modified.getUTCMilliseconds()}
    );

    try {
      let url: string = URL.createObjectURL(f, {oneTimeOnly: true}); //.substring(5);
      let sanitisedUrl: SafeResourceUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(url);
      this.currentUrl.next(sanitisedUrl);
    }
    catch (e) {
      alert('error:' + e.message);
    }
}

  public onNext() {
    if (this.currentIndex >= this.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
    this.photoList.subscribe(list => {
      // alert('image:' + this.currentIndex);
      this.getImageUrl(list[this.currentIndex]);
    });
  }

  public onPrevious() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.length - 1;
    } else {
      this.currentIndex -= 1;
    }
    this.photoList.subscribe(list => {
      // alert('image:' + this.currentIndex);
      this.getImageUrl(list[this.currentIndex]);
    });
  }

  OnNewPhoto(): void {
    this.photoDialogRef = this.dialog.open(PhotoDialogComponent, {
    });

    this.photoDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let inspectionPhoto = new InspectionPhoto();
        inspectionPhoto.InspectionId = this.inspection._id;
        inspectionPhoto.WorkOrderId = this.inspection.WorkOrderId;
        inspectionPhoto.TaskId = this.inspection.TaskId;
        inspectionPhoto.EquipmentId = this.inspection.EquipmentId;
        let db = new PouchDB('inspection-photo');
        let files: File[] = Array.from(this.photoDialogRef.componentInstance.files);
        files.forEach(f => {

          // alert('file: ' 
          //   + ' name: ' + f.name
          //   + ' type: ' + f.type
          //   + ' size: ' + f.size
          // );
      
          inspectionPhoto._id = this.config.uniqueID();
          inspectionPhoto.Photo = new Blob([f], {type: 'image/jpeg'});

          // alert('Blob size: ' + inspectionPhoto.Photo.size);

          db.put(inspectionPhoto)
            .then(result => {
              inspectionPhoto._id = result.id;
              inspectionPhoto._rev = result.rev;

              // alert('**** saved photo blob size:' + inspectionPhoto.Photo.size);

              this.photoList.subscribe(list => {
                list.push(inspectionPhoto);
                this.length = list.length;
                this.currentIndex = this.length - 1; 
              });
              this.getImageUrl(inspectionPhoto);
            })
            .catch(err => {
              console.log('OnNewPhoto db error ' + err);
              alert('OnNewPhoto db error ' + err);
            });
        });
      }
      this.photoDialogRef = null;
    });
  }

}
