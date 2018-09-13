/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { format, CountryCode } from 'libphonenumber-js';
import { Country, CountryCallCodesService } from '../../repeated-code/country-call-codes';
import { UpperCasePipe } from '@angular/common';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_NUMBER_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const PASSENGER_NUMBER_REGEX = /^(?=.*[1-4])/;

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  initialDivDisplay = 'block';
  stepperDiv = 'none';
  stepperOpen: string;
  continueToBook = 'none';
  calculateButton = 'block';
  fareLabel = 'none';
  fareBasedOnDistance: string = '';
  clearAddressesButton = 'none';
  minDate = new Date();
  paymentMethods: string[] = ["Credit Card", "Cash", "EFT"];
  minuteStep = 5;
  showTimeErrorState = false;
  stepOneSubmitClicked = false;
  countryArray: Country[];
  

  // TRANSFER VARIABLES
  pickupAddress: string = '650 Cicely Street, Garsfontein, Pretoria';
  dropoffAddress: string = 'O.R. Tambo International Airport';
  date: string = '25 September 2018';
  time: string = '14:12';
  passengers: number = 3;
  babySeat: string = 'Yes';
  trailer: string = 'No';
  transferFair: number = 450;
  distanceFair: number;
  email: string;
  mobileNumber: string;
  //////////////////////////////////////////

  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private countryCallCodesService: CountryCallCodesService) { }


  ////////////////////////////////////////////////////////////////////NGONINIT///////////////////////////////////////////////
  ngOnInit() {
    this.countryArray = this.countryCallCodesService.getCountryList();
    this.firstFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required],
      timeCtrl: this.timeFormControl,
      passengerNumberCtrl: this.passengerNumberFormControl,

    });
    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: this.emailFormControl,
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      mobileNumberCtrl: this.mobileNumberFormControl,
      paymentMethodCtrl: ['', Validators.required],
      countryCodeCtrl: this.countryCodeFormControl,
    });
    this.thirdFormGroup = this._formBuilder.group({
      
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
////////////////////////////////////////////////////////////////////ENDOF NGONINIT///////////////////////////////////////////////

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);
  
  timeFormControl = new FormControl('', [
    Validators.required,
  ]);

  mobileNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(MOBILE_NUMBER_REGEX)
  ]);

  passengerNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PASSENGER_NUMBER_REGEX)
  ]);

  countryCodeFormControl = new FormControl('ZA', [
    Validators.required,
  ]);
  
  
  
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

  stepOneSubmit() {
    const formModel1 = this.firstFormGroup.value;
    ////////////////////////////////////// formatting time ///////////////////////////////////////////////////
    if (formModel1.timeCtrl.hour > -1 && formModel1.timeCtrl.hour < 10) {
      if (formModel1.timeCtrl.minute > -1 && formModel1.timeCtrl.minute < 10) {
        this.time = '0' + formModel1.timeCtrl.hour + ':0' + formModel1.timeCtrl.minute;
      } else {
        this.time = '0' + formModel1.timeCtrl.hour + ':' + formModel1.timeCtrl.minute;
      }
    } else {
      if (formModel1.timeCtrl.minute > -1 && formModel1.timeCtrl.minute < 10) {
        this.time = formModel1.timeCtrl.hour + ':0' + formModel1.timeCtrl.minute;
      } else {
        this.time = formModel1.timeCtrl.hour + ':' + formModel1.timeCtrl.minute;
      }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.passengers = formModel1.passengerNumberCtrl;
    console.log(this.time);
    console.log(this.passengers);
    this.showTimeError();
    this.stepOneSubmitClicked = true;
  }

  showTimeError(): boolean {
    if (this.timeFormControl.hasError('required') && this.stepOneSubmitClicked) {
      this.showTimeErrorState = true;
      return this.showTimeErrorState;
    }
    if (!this.timeFormControl.hasError('required')) {
      this.showTimeErrorState = false;
      return this.showTimeErrorState;
    }
  }

  stepTwoSubmit() {
    const formModel2 = this.secondFormGroup.value;
    this.email = formModel2.emailCtrl;
    this.mobileNumber = format(formModel2.mobileNumberCtrl, formModel2.countryCodeCtrl , 'International');
    var spaceIndex =  this.mobileNumber.indexOf(' ');
    spaceIndex = spaceIndex + 1;
    console.log('Number formatted = ' + this.mobileNumber);
    if (this.mobileNumber[spaceIndex] == '0') {
      this.mobileNumber = this.mobileNumber.substring(0,spaceIndex -1) + this.mobileNumber.substring(spaceIndex + 1, this.mobileNumber.length);
    } else {
      this.mobileNumber = this.mobileNumber.substring(0,spaceIndex -1) + this.mobileNumber.substring(spaceIndex, this.mobileNumber.length);
    }
    for (var i = 0; i < this.mobileNumber.length; i++) {
      if (this.mobileNumber[i] == ' ') {
        this.mobileNumber = this.mobileNumber.substring(0,i) + this.mobileNumber.substring(i + 1, this.mobileNumber.length);
      }
    }
    console.log('Number formatted two = ' + this.mobileNumber);
    console.log(this.email);
  }

  confirmBookingClick() {

  }
}
