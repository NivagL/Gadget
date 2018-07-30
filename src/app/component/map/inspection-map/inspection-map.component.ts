import { Component, ViewChild, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MouseEvent, MapsAPILoader, GoogleMapsAPIWrapper, AgmMap, LatLng, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import { Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Inspection } from '../../../model/inspection'
import { InspectionService } from '../../../service/inspection.service';
import { FilteredInspectionService } from '../../../service/filtered-inspection.service';
import { ConfigurationService } from '../../../service/configuration.service';
//import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-inspection-map',
  templateUrl: './inspection-map.component.html',
  styleUrls: ['./inspection-map.component.css']
})
export class InspectionListMapComponent implements OnInit, AfterViewInit, OnDestroy {
  //map: google.maps.Map;
  // bounds: LatLngBounds;
  // latlngBounds: google.maps.LatLngBounds;
  // placeService: google.maps.places.PlacesService;
  // directionService: google.maps.DirectionsService;
  // addressService: google.maps.Geocoder;

  @ViewChild('AgmMap') agmMap: AgmMap;

  @Output() onSelectedInspection: EventEmitter<Inspection>;

  private _inspections: Array<Inspection>;
  @Input() set inspections(list: Array<Inspection>) {
    // if(list.length > 0) {
      // const bounds: LatLngBounds = new google.maps.LatLngBounds();
      this._inspections = list;
      this.markers = new Array<marker>();
      this._inspections.forEach(i => {
        this.markers.push({
          lat: i.Location.Lat, lng: i.Location.Lng,
          iconUrl: 'assets/icon/pin_' + i.Status + '.png', inspection: i
        });
        let pos: any = {lat: i.Location.Lat, lng: i.Location.Lng};
        // bounds.extend(pos);
      });
      if (this.markers.length > 0) {
        this.lat = this.markers[0].lat;
        this.lng = this.markers[0].lng;
      }
      // this.agmMap.fitBounds = bounds;
    // }
    if (this.config.getShowMapLocation()) {
      navigator.geolocation.getCurrentPosition(result => {
        let latitude = +result.coords.latitude.toFixed(6);
        let longitude = +result.coords.longitude.toFixed(6);;
        this.markers.push({
          lat: latitude, lng: longitude,
          iconUrl: 'assets/icon/inspector.png', inspection: new Inspection()
        });
      })
    }
  }
  get inspections(): Array<Inspection> {
    return this._inspections;
  }
  
  private _selectedInspection: Inspection;
  @Input() set selectedInspection(item: Inspection) {
    if(item == undefined) { return; }
    if(this.markers == undefined) { return; }

    this._selectedInspection = item;
    let m = this.markers.find(m => m.inspection._id == this._selectedInspection._id);
    if (m == undefined) {
      if(this._selectedInspection.Location == undefined) { return; }

      this.markers.push({
        lat: this._selectedInspection.Location.Lat, lng: this._selectedInspection.Location.Lng,
        iconUrl: 'assets/icon/pin_' + this._selectedInspection.Status + '.png', inspection: this._selectedInspection
      });
    } else {
      m.lat = this._selectedInspection.Location.Lat;
      m.lng = this._selectedInspection.Location.Lng;
      m.iconUrl = 'assets/icon/pin_' + this._selectedInspection.Status + '.png';
      m.inspection = this._selectedInspection;
    }

    this.lat = this._selectedInspection.Location.Lat;
    this.lng = this._selectedInspection.Location.Lng;
  }
  get selectedInspection(): Inspection {
    return this._selectedInspection;
  }

  public markers: Array<marker>;

  zoom: number = 14;
  lat: number = -1;
  lng: number = -1;

  constructor(private mapsAPILoader: MapsAPILoader, 
    private gmapsApi: GoogleMapsAPIWrapper,
    private router: Router, private config: ConfigurationService,
    private inspectionService: InspectionService,
    private filteredInspections: FilteredInspectionService,
  ) {
    this.onSelectedInspection = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  clickedMarker(label: string, index: number) {
    this.onSelectedInspection.emit(this.markers[index].inspection);
  }

  mapReady(map) {
    console.log(this.agmMap);
    this.agmMap.mapReady.subscribe(map => {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      for (const mm of this.markers) {
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }
      map.fitBounds(bounds);
    });
  }

  // addRoutes() {
  //   this.gmapsApi.getNativeMap()
  //   .then(map => {
  //     let directionsService = new google.maps.DirectionsService;
  //     let directionsDisplay = new google.maps.DirectionsRenderer;
  //     directionsDisplay.setMap(this.map);
  //     directionsService.route({
  //             origin: {lat: this.markers[0].lat, lng: this.markers[0].lng},
  //             destination: {lat: this.markers[1].lat, lng: this.markers[1].lng},
  //             waypoints: [],
  //             optimizeWaypoints: true,
  //             //travelMode: travelMode.
  //           }, function(response, status) {
  //                       if (status === google.maps.DirectionsStatus.OK) {
  //                         directionsDisplay.setDirections(response);
  //                         console.log(response);
  //                       } else {
  //                         window.alert('Directions request failed due to ' + status);
  //                       }
  //     });      
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });    
  //   // let placeService = new google.maps.places.PlacesService(this.map);
  //   // placeService.getDetails({
  //   //   placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  //   //   }, function (result, status) {
  //   //     console.log(result.geometry.location.lat());
  //   //     console.log(result.geometry.location.lng())
  //   //   });

  // }
}

interface marker {
  lat: number;
  lng: number;
  iconUrl: string;
  inspection: Inspection;
}