import {Component, Input, OnInit, Injectable} from '@angular/core';
import { TransferDistanceService } from '../../../services/transfer-distance.service';
/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.css'],
  providers: [TransferDistanceService]
})

export class MapRouteComponent implements OnInit {
  map_component;
  @Input('start') trip_starting_point: google.maps.LatLng;
  @Input('end') trip_ending_point: google.maps.LatLng;
  tripDistance: number = 0;

  constructor(private transferDistanceService: TransferDistanceService) { }

  ngOnInit() {
    this.map_component = new google.maps.Map(document.getElementById('google_map'), {
      center: this.trip_starting_point,
      zoom: 8,
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: 'none',
    });
    this.initMap();
     let styledMapType = new google.maps.StyledMapType(
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ], 
      { name: 'Styled' });
       this.map_component.mapTypes.set('Styled', styledMapType);
     this.map_component.setMapTypeId('Styled');
  }

  initRoutePoints(){
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.trip_starting_point],
        destinations: [this.trip_ending_point],
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        this.tripDistance = Math.ceil(result.rows[0].elements[0].distance.value / 1000);
        console.log('distance has been calculated');
        this.transferDistanceService.setTransferDistance(this.tripDistance);
      });
  }

  initDirections(){
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#150a46", strokeWeight: 5 } });
    directionsDisplay.setMap(this.map_component);
    let request = {
      origin: this.trip_starting_point,
      destination: this.trip_ending_point,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status.toString() === 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }

  public initMap(){
    this.initRoutePoints();
    this.initDirections();
  }
}
