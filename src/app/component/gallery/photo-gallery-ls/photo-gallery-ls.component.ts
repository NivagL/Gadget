import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ConfigurationService } from '../../../service/configuration.service';

import { Inspection } from '../../../model/inspection';
import { PhotoDialogComponent } from './../photo-dialog/photo-dialog.component';
import { InspectionPhoto } from '../../../model/inspection-photo';

@Component({
  selector: 'app-photo-gallery-ls',
  templateUrl: './photo-gallery-ls.component.html',
  styleUrls: ['./photo-gallery-ls.component.css']
})
export class PhotoGalleryLsComponent implements OnInit {
  photoDialogRef: MatDialogRef<PhotoDialogComponent>;
  inspection: Inspection;

  photoList: BehaviorSubject<Array<InspectionPhoto>>;
  currentUrl: BehaviorSubject<SafeResourceUrl>;
  currentIndex: number;
  length: number;
  rotate: string;

  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    public dialog: MatDialog,
    public domSanitiser: DomSanitizer) {

    this.photoList = new BehaviorSubject<Array<InspectionPhoto>>(new Array<InspectionPhoto>());
    this.currentUrl = new BehaviorSubject<string>('');
    this.currentIndex = 0;
    this.length = 0;
    this.rotate = this.config.getRotateImages() ? "rotate90" : ""; 
  }

  ngOnInit() {
    this.photoList.subscribe(list => {
      let sKey: string;
      for (let i = 0; sKey = sessionStorage.key(i); i++) {
        if(sKey.startsWith('i_' + this.inspection._id)) {
          let inspectionPhoto = new InspectionPhoto();
          inspectionPhoto.InspectionId = this.inspection._id;
          inspectionPhoto.WorkOrderId = this.inspection.WorkOrderId;
          inspectionPhoto.TaskId = this.inspection.TaskId;
          inspectionPhoto.EquipmentId = this.inspection.EquipmentId;
  
          let dataURL = sessionStorage.getItem(sKey);
          inspectionPhoto.Photo = this.dataURItoBlob(dataURL);
          
          list.push(inspectionPhoto);
          this.length = list.length;
          this.currentIndex = list.length - 1;
          this.getImageUrl(inspectionPhoto);
       }
      }
    });
  }
  
  dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
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
      alert('3:' + (<Error>e).message);
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
    this.photoDialogRef = this.dialog.open(PhotoDialogComponent);
    this.photoDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let inspectionPhoto = new InspectionPhoto();
        inspectionPhoto.InspectionId = this.inspection._id;
        inspectionPhoto.WorkOrderId = this.inspection.WorkOrderId;
        inspectionPhoto.TaskId = this.inspection.TaskId;
        inspectionPhoto.EquipmentId = this.inspection.EquipmentId;
        let files: File[] = Array.from(this.photoDialogRef.componentInstance.files);
        files.forEach(f => {
      
          inspectionPhoto._id = this.config.uniqueID();
          inspectionPhoto.Photo = new Blob([f], {type: 'image/jpeg'});
          console.log('file size: ' + inspectionPhoto.Photo.size);
          
          let sKey: string = 'i_' + inspectionPhoto.InspectionId + '_' + this.config.uniqueID();

          //this.getImageUrl(inspectionPhoto);
          let canvas = <HTMLCanvasElement>document.getElementById('canvas');

          let url: string = URL.createObjectURL(inspectionPhoto.Photo);
          let sanitisedUrl: SafeResourceUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(url);
              
          var image = new Image();
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
  
            console.log('data url size: ' + dataURL.length);
            try {
              sessionStorage.setItem(sKey, dataURL);
            } catch (e) {
              alert('local storage error:' + e.message);
            }

            this.photoList.subscribe(list => {
              list.push(inspectionPhoto);
              this.length = list.length;
              this.currentIndex = this.length - 1; 
            });
            this.getImageUrl(inspectionPhoto);
            }

        });
        this.photoDialogRef = null;
      }
    });
  }
}
