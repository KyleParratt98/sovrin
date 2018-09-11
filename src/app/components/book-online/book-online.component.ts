import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-book-online',
  templateUrl: './book-online.component.html',
  styleUrls: ['./book-online.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
        width: '*'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})

export class BookOnlineComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('search2') public searchElement2: ElementRef;
  @ViewChild('search3') public searchElement3: ElementRef;
  @ViewChild('search4') public searchElement4: ElementRef;
  initialDivDisplay = 'block';
  stepperDiv = 'none';
  stepperOpen: string;
  continueToBook = 'none';
  calculateButton = 'block';
  fareLabel = 'none';
  fareBasedOnDistance: string = '';
  clearAddressesButton = 'none';
  minDate = new Date();
  paymentMethods: string[] = ["Credit Card", "Cash", "EFT"]
  

  // TRANSFER VARIABLES
  pickupAddress: string = '650 Cicely Street, Garsfontein, Pretoria';
  dropoffAddress: string = 'O.R. Tambo International Airport';
  date: string = '25 September 2018';
  time: string = '14:12';
  passengers: number = 3;
  babySeat: string = 'Yes';
  trailer: string = 'No';
  transferFair: number = 450;
  //////////////////////////////////////////

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyNameCtrl: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
      riskNameCtrl: ['', Validators.required],
    });
    this.stepperOpen = 'out';

    var options = {
      types: ["address"],
      componentRestrictions: {country: "za"}
     };
    
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null ){
            return;
          }
        });
      });
    });
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement2.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null ){
            return;
          }
        });
      });
    });
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement3.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null ){
            return;
          }
        });
      });
    });
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement4.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null ){
            return;
          }
        });
      });
    });
  }
  

  calculateFareClick() {
    this.calculateButton = 'none';
    this.continueToBook = 'block';
    this.fareLabel = 'block';
    this.fareBasedOnDistance = '600';
    this.clearAddressesButton = 'block';
  }

  backToInitial() {
    this.initialDivDisplay = 'block';
    this.stepperDiv = 'none';
    this.stepperOpen = this.stepperOpen === 'in' ? 'out' : 'in';
    this.continueToBook = 'none';
    this.calculateButton = 'block';
    this.fareLabel = 'none';
    this.clearAddressesButton = 'none';
    this.fareBasedOnDistance = '';
  }

  continueToBookClick() {
    this.initialDivDisplay = 'none';
    this.stepperDiv = 'block';
    this.stepperOpen = this.stepperOpen === 'out' ? 'in' : 'out';
  }

  returnToInitialState() {
    this.continueToBook = 'none';
    this.calculateButton = 'block';
    this.fareLabel = 'none';
    this.clearAddressesButton = 'none';
    this.fareBasedOnDistance = '';
  }

  confirmBookingClick() {

  }

  

}
