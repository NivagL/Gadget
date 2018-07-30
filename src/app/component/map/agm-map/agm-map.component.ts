import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Inspection } from '../../../model/inspection'
import { InspectionService } from '../../../service/inspection.service';
import { FilteredInspectionService } from '../../../service/filtered-inspection.service';
import { ConfigurationService } from '../../../service/configuration.service';

declare var google: any;

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements OnInit, AfterViewInit {
  markers: BehaviorSubject<Array<marker>>; 
  bounds: LatLngBounds;
  lat = -36.8629409;
  lng = 174.7253871;
  zoom = 15; 

  private _inspections: Array<Inspection>;
  @Input() set inspections(list: Array<Inspection>) {
    if(list.length > 0) {
      this._inspections = list;
      this.markers.subscribe(list => {
        let newMarkers = new Array<marker>();
        this.bounds = new google.maps.LatLngBounds();
        this._inspections.forEach(i => {
          newMarkers.push({
            lat: i.Location.Lat, lng: i.Location.Lng,
            iconUrl: 'assets/icon/pin_' + i.Status + '.png', inspection: i
          });
          this.bounds.extend(new google.maps.LatLng(i.Location.Lat, i.Location.Lng));
        });
        // if (this.markers.length > 0) {
        //   this.lat = this.markers[0].lat;
        //   this.lng = this.markers[0].lng;
        // }
        this.markers.next(newMarkers);
        // this.fitMap();
      });
    }
    // if (this.config.getShowMapLocation()) {
    //   alert('displaying location');
    //   navigator.geolocation.getCurrentPosition(result => {
    //     let latitude = +result.coords.latitude.toFixed(6);
    //     let longitude = +result.coords.longitude.toFixed(6);;
    //     this.markers.push({
    //       lat: latitude, lng: longitude,
    //       iconUrl: 'assets/icon/inspector.png', inspection: new Inspection()
    //     });
    //   })
    // }
  }
  get inspections(): Array<Inspection> {
    return this._inspections;
  }
  
  @ViewChild('AgmMap') agmMap: AgmMap;

  constructor(private inspectionService: InspectionService,
    private config: ConfigurationService) { 
    this.markers = new BehaviorSubject<Array<marker>>(new Array<marker>()); 
  }

  ngOnInit() {
    this.bounds = new google.maps.LatLngBounds();
  }

  ngAfterViewInit() {
    this.fitMap();
  }

  fitMap() {
    console.log(this.agmMap);
    this.agmMap.mapReady.subscribe(map => {
      // const bounds: LatLngBounds = new google.maps.LatLngBounds();
      // for (const mm of this.markers) {
      //   bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      // }
      map.fitBounds(this.bounds);
    });
  }

  mapReady(map) {
    // this.fitMap();
  }

  mapIdle() {
    console.log('idle');
  }
}

interface marker {
  lat: number;
  lng: number;
  iconUrl: string;
  inspection: Inspection;
}