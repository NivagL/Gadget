import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-arcgis-map',
  templateUrl: './arcgis-map.component.html',
  styleUrls: ['./arcgis-map.component.css']
})
export class ArcgisMapComponent implements OnInit {
  arcgismap_url = 'https://maps.vector.co.nz/arcgis/apps/webappviewer/index.html?id=a81464d98eb14c9f962948eab17f574a';
  sanitisedUrl: SafeResourceUrl;

  constructor(public domSanitiser: DomSanitizer) { 
    //this.sanitisedUrl = this.domSanitiser.bypassSecurityTrustResourceUrl(this.arcgismap_url);
    this.sanitisedUrl = this.domSanitiser.bypassSecurityTrustUrl('https://maps.vector.co.nz/');
  }

  ngOnInit() {
  }

}
