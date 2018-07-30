import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationService } from '../../service/configuration.service';
import { Inspection } from '../../model/inspection';
import { AccessDetails } from '../../model/access';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-access-dialog',
  templateUrl: './access-dialog.component.html',
  styleUrls: ['./access-dialog.component.css']
})
export class AccessDialogComponent implements OnInit {
  access: AccessDetails;
  files : FileList;

  currentUrl: BehaviorSubject<SafeResourceUrl>;
  
  constructor(public config: ConfigurationService,
    public dialogRef: MatDialogRef<AccessDialogComponent>,
    public domSanitiser: DomSanitizer) {
    this.currentUrl = new BehaviorSubject<SafeResourceUrl>('');
  }

  ngOnInit() {

  }

  getFileUrl(f: File) {
    try {
      let url: string = URL.createObjectURL(f, {oneTimeOnly: true}); //.substring(5);
      let sanitisedUrl: SafeResourceUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(url);
      this.currentUrl.next(sanitisedUrl);
    }
    catch (e) {
      alert('error:' + e.message);
    }
  }

  getFiles(event) {
    this.files = event.target.files;
    this.getFileUrl(this.files[0]);
  }
}
