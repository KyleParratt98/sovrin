import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us-map',
  templateUrl: './contact-us-map.component.html',
  styleUrls: ['./contact-us-map.component.css']
})
export class ContactUsMapComponent implements OnInit {
 
  lat: number = -25.86047277668796;
  lng: number = 28.190846506845446;

  constructor() { }

  ngOnInit() {
  }

}
