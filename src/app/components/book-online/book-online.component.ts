/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { format } from 'libphonenumber-js';
import { Country, CountryCallCodesService } from '../../services/country-call-code-service';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { FormatService } from '../../services/format.service';

const moment = _rollupMoment || _moment;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_NUMBER_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const PASSENGER_NUMBER_REGEX = /^(?=.*[1-4])/;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
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
  options = {
    types: ["address"],
    componentRestrictions: {country: "za"}
   };
  
  // TRANSFER VARIABLES
  pickupAddress: string = '';
  dropoffAddress: string = '';
  date: string;
  time: string;
  passengers: number;
  babySeat: boolean = false;
  trailer: boolean = false;
  transferFair: number = 450;
  distanceFair: number;
  email: string;
  mobileNumber: string;
  //////////////////////////////////////////

  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private countryCallCodesService: CountryCallCodesService, private formatService: FormatService) { }


  ////////////////////////////////////////////////////////////////////NGONINIT///////////////////////////////////////////////
  ngOnInit() {
    console.log(this.minDate);
    this.countryArray = this.countryCallCodesService.getCountryList();
    this.firstFormGroup = this._formBuilder.group({
      dateCtrl: this.dateFormControl,
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
    
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, this.options);
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
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement2.nativeElement, this.options);
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
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement3.nativeElement, this.options);
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
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement4.nativeElement, this.options);
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

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  stepOneSubmit() {
    const formModel1 = this.firstFormGroup.value;
    this.time = formModel1.timeCtrl;
    this.time = this.formatService.formatTime(this.time);
    this.passengers = formModel1.passengerNumberCtrl;
    this.date = formModel1.dateCtrl;
    this.showTimeError();
    this.stepOneSubmitClicked = true;
  }

  stepTwoSubmit() {
    const formModel2 = this.secondFormGroup.value;
    this.email = formModel2.emailCtrl;
    this.mobileNumber = format(formModel2.mobileNumberCtrl, formModel2.countryCodeCtrl , 'International');
    console.log('pre-format: ' + this.mobileNumber);
    this.mobileNumber = this.formatService.formatMobileNumber(this.mobileNumber);
    console.log('post-format: ' + this.mobileNumber);

  }

  confirmBookingClick() {

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

  calculateFareClickMobile() {
    this.calculateButton = 'none';
    this.continueToBook = 'block';
    this.fareLabel = 'block';
    this.fareBasedOnDistance = '600';
    this.clearAddressesButton = 'block';
    this.pickupAddress = this.searchElement3.nativeElement.value;
    this.dropoffAddress = this.searchElement4.nativeElement.value;
  }
  calculateFareClickDesktop() {
    this.calculateButton = 'none';
    this.continueToBook = 'block';
    this.fareLabel = 'block';
    this.fareBasedOnDistance = '600';
    this.clearAddressesButton = 'block';
    this.pickupAddress = this.searchElement.nativeElement.value;
    this.dropoffAddress = this.searchElement2.nativeElement.value;
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
    this.pickupAddress = this.searchElement.nativeElement.value;
    this.dropoffAddress = this.searchElement2.nativeElement.value;
  }

  returnToInitialState() {
    this.continueToBook = 'none';
    this.calculateButton = 'block';
    this.fareLabel = 'none';
    this.clearAddressesButton = 'none';
    this.fareBasedOnDistance = '';
  }
}
