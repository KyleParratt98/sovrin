import {Component, Input, OnInit, Injectable} from '@angular/core';
import {} from '@types/googlemaps';
import { BookOnlineComponent } from '../book-online.component';

@Injectable()
@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.css'],
  providers: [BookOnlineComponent],
})
export class MapRouteComponent implements OnInit {
  map_component;
  mapStyleArray_ = [
    {
      "stylers": [
        {
          "saturation": -100
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#0099dd"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#aadd55"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {}
  ];
  @Input('start') trip_starting_point: {location: google.maps.LatLng, name: string};
  @Input('end') trip_ending_point: {location: google.maps.LatLng, name: string};
  trip_details : {duration: string, distance: number} = {duration: '', distance: 0};

  constructor(private bookOnlineComponent: BookOnlineComponent) { }

  ngOnInit() {
    this.map_component = new google.maps.Map(document.getElementById('google_map'), {
      center: this.trip_starting_point.location,
      zoom: 8,
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: 'none',
    });
    this.initMap();
  //    let styledMapType = new google.maps.StyledMapType(this.mapStyleArray_, { name: 'Styled' });
       //this.map_component.mapTypes.set('Styled', styledMapType);
    //  this.map_component.setMapTypeId('Styled');
  }

  initRoutePoints(){
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.trip_starting_point.location],
        destinations: [this.trip_ending_point.location],
        travelMode: google.maps.TravelMode.DRIVING
      }, (res, status) => {
        console.log(res.rows[0].elements[0]);
        this.trip_details.distance = Math.ceil(res.rows[0].elements[0].distance.value / 1000);
      });
  }

  initDirections(){
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map_component);
    let request = {
      origin: this.trip_starting_point.location,
      destination: this.trip_ending_point.location,
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
