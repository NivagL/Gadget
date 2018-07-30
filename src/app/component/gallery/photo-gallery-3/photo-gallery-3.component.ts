import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { ConfigurationService } from '../../../service/configuration.service';
import { DateService } from '../../../service/date.service';

import PouchDB from 'pouchdb';
// import PouchDBFind from 'pouchdb-find';

import { Location } from '../../../model/location';
import { Inspection } from '../../../model/inspection';
import { Observation } from '../../../model/observation';
import { PhotoDialogComponent } from './../photo-dialog/photo-dialog.component';
import { InspectionPhoto } from '../../../model/inspection-photo';

@Component({
  selector: 'app-photo-gallery-3',
  templateUrl: './photo-gallery-3.component.html',
  styleUrls: ['./photo-gallery-3.component.css']
})
export class PhotoGallery3Component implements OnInit {
  photoDialogRef: MatDialogRef<PhotoDialogComponent>;
  inspection: Inspection;
  launch_observation: Observation;
  observation: Observation;
  inspectionPhoto: InspectionPhoto;
  
  photoList: BehaviorSubject<Array<InspectionPhoto>>;
  currentUrl: BehaviorSubject<SafeResourceUrl>;
  
  currentIndex: number;
  length: number;
  rotate: string;
  
  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public dialog: MatDialog,
    public domSanitiser: DomSanitizer,
    public dateService: DateService) {

    this.photoList = new BehaviorSubject<Array<InspectionPhoto>>(new Array<InspectionPhoto>());
    this.currentUrl = new BehaviorSubject<string>('');
    this.currentIndex = 0;
    this.length = 0;
    this.rotate = this.config.getRotateImages() ? "rotate90" : ""; 
  
    this.inspectionPhoto = new InspectionPhoto();
    this.inspectionPhoto.TakenOn = '';
    this.observation = new Observation();
    this.observation.Text = '';
  }

  ngOnInit() {
    // let db = new PouchDB('InspectionPhoto', {size: 500});
    // db.info().then(info => {
    //   console.log('db info: ' + JSON.stringify(info));
    // });

    let db = new PouchDB('InspectionPhoto', {size: 50});
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
      let newList = Array<InspectionPhoto>();
      list.forEach(p => {
        if(p.InspectionId == this.inspection._id){
          newList.push(p);
        }
      });
      
      this.length = newList.length;
      this.currentIndex = 0; 
      this.photoList.next(newList);
      if(newList.length > 0) {
        this.inspectionPhoto = newList[0];
        this.getImageUrl(newList[0]);
      }
    })
    .catch(err => {
      console.log('ngOnInit db error' + err);
      alert('ngOnInit db error' + err);
    });

  }

  dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], { type: mimeString });
    return blob;
  }
  
  public getImageUrl(inspectionPhoto: InspectionPhoto): void {
    if(inspectionPhoto.Photo == undefined) {
      inspectionPhoto.Photo = this.dataURItoBlob(inspectionPhoto.Text);      
    }

    this.observation = inspectionPhoto.Observation;

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
        inspectionPhoto.TakenOn = this.dateService.getDate() + ' ' + this.dateService.getTime();
        inspectionPhoto.Observation = this.launch_observation;
        try {
          navigator.geolocation.getCurrentPosition(result => {
            inspectionPhoto.TakenAt = new Location();
            let latitude = +result.coords.latitude.toFixed(6);
            let longitude = +result.coords.longitude.toFixed(6);
            inspectionPhoto.TakenAt.Lat = latitude;
            inspectionPhoto.TakenAt.Lng = longitude;
          })
        }
        catch(ex) {
          console.log('Error capturing gps location: ' + ex.message);
        }
        
        let db = new PouchDB('InspectionPhoto', {size: 50});
        let files: File[] = Array.from(this.photoDialogRef.componentInstance.files);
        files.forEach(f => {

          // alert('file: ' 
          //   + ' name: ' + f.name
          //   + ' type: ' + f.type
          //   + ' size: ' + f.size
          // );
      
          inspectionPhoto._id = this.config.uniqueID();
          //inspectionPhoto.Photo = new Blob([f], {type: 'image/jpeg'});

          let canvas = <HTMLCanvasElement>document.getElementById('canvas');
          let url: string = URL.createObjectURL(f);
          let sanitisedUrl: SafeResourceUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(url);

          let image = new Image();
          image.src = url;

          image.onload = () => {

            let ctx = canvas.getContext('2d');
            //ctx.clearRect(0, 0, 400, 400)

            canvas.width = image.width;
            canvas.height = image.height;
  
            ctx.drawImage(image, 0, 0);

            let dataURL: string;
            try {
              dataURL = canvas.toDataURL('image/jpeg');
            } catch (e) {
              console.log('data url error:' + e.message);
            }
            inspectionPhoto.Text = dataURL;
          
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
                this.inspectionPhoto = inspectionPhoto;
                this.getImageUrl(inspectionPhoto);
              })
              .catch(err => {
                console.log('OnNewPhoto db error ' + err);
                alert('OnNewPhoto db error ' + err);
              });

          }
        });
      }
      this.photoDialogRef = null;
    });
  }

}
