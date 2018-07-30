import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
//import { } from '@types/googlemaps';
import { Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Inspection } from '../../../model/inspection'
import { InspectionService } from '../../../service/inspection.service';
import { FilteredInspectionService } from '../../../service/filtered-inspection.service';
import { ConfigurationService } from '../../../service/configuration.service';

declare const google: any;

@Component({
  selector: 'app-sdk-map',
  templateUrl: './sdk-map.component.html',
  styleUrls: ['./sdk-map.component.css']
})
export class SdkMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  gmap: any;
  inspectionMarkers: Array<{inspection: Inspection, marker: any}>;
  location: any;
  new_location_icon: string = 'outline_add_location_black_18dp.png'
  inspector_icon: string = 'outline_location_on_black_18dp.png'

  @Output() onSelectedInspection: EventEmitter<Inspection>;

  private _inspections: Array<Inspection>;
  @Input() set inspections(list: Array<Inspection>) {
    this._inspections = list;
    this.populateMarkers();
  }

  get inspections(): Array<Inspection> {
    return this._inspections;
  }
  
  private _selectedInspection: Inspection;
  @Input() set selectedInspection(item: Inspection) {
    // if(item == undefined) { return; }
    // this._selectedInspection = item;

    // if(this.markers == undefined) { return; }
    // let m = this.markers.find(m => m.inspection._id == this._selectedInspection._id);
    // if (m == undefined) {
    //   if(this._selectedInspection.Location == undefined) { return; }

    //   this.markers.push({
    //     lat: this._selectedInspection.Location.Lat, lng: this._selectedInspection.Location.Lng,
    //     iconUrl: 'assets/icon/pin_' + this._selectedInspection.Status + '.png', inspection: this._selectedInspection
    //   });
    // } else {
    //   m.lat = this._selectedInspection.Location.Lat;
    //   m.lng = this._selectedInspection.Location.Lng;
    //   m.iconUrl = 'assets/icon/pin_' + this._selectedInspection.Status + '.png';
    //   m.inspection = this._selectedInspection;
    // }

    // this.lat = this._selectedInspection.Location.Lat;
    // this.lng = this._selectedInspection.Location.Lng;
  }
  get selectedInspection(): Inspection {
    return this._selectedInspection;
  }
  
  constructor(private config: ConfigurationService) {
    this.onSelectedInspection = new EventEmitter();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    let mapProp = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // if(this.inspectionMarkers.length > 0) {
      // this.map.setCenter(this.inspectionMarkers[this.inspectionMarkers.length - 1].marker.getPosition());
    // }
    this.populateMarkers();
  }

  findAddress(address: string) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, (results, status) => {
      let marker = new google.maps.Marker
      (
          {
              map: this.gmap,
              position: results[0].geometry.location,
              icon: 'assets/icon/' + this.new_location_icon
          }
      );
    });
  }

  populateMarkers() {
    this.inspectionMarkers = new Array<{inspection: Inspection, marker: any}>();

    this._inspections.forEach(i => {
      let m = new google.maps.Marker({
        map: this.gmap,
        position: new google.maps.LatLng(i.Location.Lat, i.Location.Lng),
        icon: 'assets/icon/pin_' + i.Status + '.png',
      });
      this.inspectionMarkers.push({inspection: i, marker: m});
    });

    if (this.config.getShowMapLocation()) {
      this.showLocation();
    }
    
  }

  showLocation() {
    // navigator.geolocation.getCurrentPosition(result => {
    //   let latitude = +result.coords.latitude.toFixed(6);
    //   let longitude = +result.coords.longitude.toFixed(6);;
    //   this.location = new google.maps.Marker({
    //     map: this.map,
    //     position: new google.maps.LatLng(latitude, longitude),
    //     icon: 'assets/icon/' + this.inspector_icon
    //   });
    // });
  }

  private onFitContents(coordinates: Coordinates[], mapLoaded: boolean) {
  
      if (!mapLoaded || coordinates.length === 0) {
        return;
      }
  
      // let bounds = new google.maps.LatLngBounds();
      // for (let coordinate of coordinates) {
      //   let point: LatLng = new google.maps.LatLng(coordinate[1], coordinate[0]);
      //   if (coordinates.length > 1) {
      //     bounds.extend(point);
      //   } else {
      //     this.wrapper.setMapOptions({maxZoom: 16});  // change the zoom to your needs
      //     bounds.extend(point);
      //   }
      // }
      // this.mapBounds = bounds;
    }  
}
