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
  selector: 'app-photo-gallery-4',
  templateUrl: './photo-gallery-4.component.html',
  styleUrls: ['./photo-gallery-4.component.css']
})
export class PhotoGallery4Component implements OnInit {
  photoDialogRef: MatDialogRef<PhotoDialogComponent>;
  inspection: Inspection;
  launch_observation: Observation;
  observation: Observation;
  inspectionPhoto: InspectionPhoto;
  
  photoList: BehaviorSubject<Array<InspectionPhoto>>;
  currentUrl: BehaviorSubject<SafeResourceUrl>;
  currentStyle: BehaviorSubject<SafeStyle>;
  
  currentIndex: number;
  length: number;
  rotate: string;
  selectedColour;
  files : FileList;

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

    this.selectedColour = localStorage.getItem('AnnotationColour');
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

    let url: string;
    try {
      url = URL.createObjectURL(f, {oneTimeOnly: true}); //.substring(5);
      let sanitisedUrl: SafeResourceUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(url);
      this.currentUrl.next(sanitisedUrl);
    }
    catch (e) {
      alert('error:' + e.message);
    }
    
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let image = new Image();
    image.src = url;

    image.onload = () => {

      let ctx = canvas.getContext('2d');
      //ctx.clearRect(0, 0, 400, 400)

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);
      //ctx.drawImage(image,0,0,image.width,image.height,0,0,image.width*0.25,image.height*0.25);
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
  
  onRemovePhoto(): void {
    this.photoList.subscribe(list => {
      list.slice(this.currentIndex, this.currentIndex + 1);
      this.length = list.length;
      this.currentIndex = this.length - 1; 
    });
  }

  getFiles(event) {
    this.files = event.target.files; 
    this.OnNewPhoto();
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
        // let files: File[] = Array.from(this.files);
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

            canvas.width = image.width*0.33;
            canvas.height = image.height*0.33;
  
            

            //ctx.drawImage(image, 0, 0, );
            ctx.drawImage(image,0,0,image.width,image.height,0,0,image.width*0.33,image.height*0.33);

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
                //this.getImageUrl(inspectionPhoto);
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

  getCursorPosition(canvas, event): {x: number, y: number} {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    let width = rect.right - rect.left;
    let height = rect.bottom - rect.top;

    let xfactor = (canvas.width/width);
    let yfactor = (canvas.height/height);

    return {x: x * xfactor, y: y * yfactor}
  }

  onAnnotation() {
    this.annotating = !this.annotating;
  }

  onColourChange() {
    localStorage.setItem('AnnotationColour', this.selectedColour);
  }

  onSaveAnnotation() {

  }

  onCancelAnnotation() {
    
  }
  
  last_mousex: number = 0;
  last_mousey: number = 0;
  mousex: number = 0;
  mousey: number = 0;
  annotating: boolean = false;
  tooltype: string = 'draw';

  onMouseDown(e: MouseEvent) {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let coords = this.getCursorPosition(canvas, e);

    //ctx.fillText(

    this.last_mousex = this.mousex = coords.x;
    this.last_mousey = this.mousey = coords.y;
    this.annotating = true;
  }

  onTouchStart = (e: TouchEvent): void => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let coords = this.getCursorPosition(canvas, e);

    //ctx.fillText(

    this.last_mousex = this.mousex = coords.x;
    this.last_mousey = this.mousey = coords.y;
    this.annotating = true;
  }

  onMouseUp(e: MouseEvent) {
    this.annotating = false;
  }

  onTouchEnd = (event: TouchEvent): void => {
    this.annotating = false;
  }

  onMouseMove(e: MouseEvent) {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let coords = this.getCursorPosition(canvas, e);
    this.mousex = coords.x;
    this.mousey = coords.y;

    if(this.annotating) {
    ctx.beginPath();
      if(this.tooltype=='draw') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = this.selectedColour; //'black';
          ctx.lineWidth = 3;
      } else {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 10;
      }
      ctx.moveTo(this.last_mousex,this.last_mousey);
      ctx.lineTo(this.mousex,this.mousey);
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.stroke();
    }
    this.last_mousex = this.mousex;
    this.last_mousey = this.mousey;
  }

  onTouchMove = (e: TouchEvent): void => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let coords = this.getCursorPosition(canvas, e);
    this.mousex = coords.x;
    this.mousey = coords.y;

    if(this.annotating) {
    ctx.beginPath();
      if(this.tooltype=='draw') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = this.selectedColour; //'black';
          ctx.lineWidth = 3;
      } else {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 10;
      }
      ctx.moveTo(this.last_mousex,this.last_mousey);
      ctx.lineTo(this.mousex,this.mousey);
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.stroke();
    }
    this.last_mousex = this.mousex;
    this.last_mousey = this.mousey;
  }












  // private onTouchStart = (event: TouchEvent): void => {
  //   // Prevent scrolling.
  //   event.preventDefault();

  //   if (event.targetTouches.length === 1) {
  //     const touch = event.changedTouches[0];
  //     this._strokeBegin(touch);
  //   }
  // }

  // private onTouchMove = (event: TouchEvent): void => {
  //   // Prevent scrolling.
  //   event.preventDefault();

  //   const touch = event.targetTouches[0];
  //   this._strokeMoveUpdate(touch);
  // }

  // private onTouchEnd = (event: TouchEvent): void => {
  //   const wasCanvasTouched = event.target === this.canvas;
  //   if (wasCanvasTouched) {
  //     event.preventDefault();

  //     const touch = event.changedTouches[0];
  //     this._strokeEnd(touch);
  //   }
  // }
}
