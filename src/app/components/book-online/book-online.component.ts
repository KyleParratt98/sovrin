/// <reference types="@types/googlemaps" />
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef } from '@angular/core';
import { format } from 'libphonenumber-js';
import { Country, CountryCallCodesService } from '../../services/country-call-code-service';
import { FormatService } from '../../services/format.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

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

  trip_start: {location: google.maps.LatLng, name: string};
  trip_end: {location: google.maps.LatLng, name: string};
  autocompleteStart;
  autocompleteEnd;
  geoencoder_;
  dropofflocation;
  pickuplocation;

  displayType;
  mapRouteDisplay = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  initialDivDisplay = true;
  stepperDiv = false;
  stepperOpen: string;
  continueToBook = false;
  calculateButton = true;
  fareLabel = false;
  fareBasedOnDistance: string = '';
  clearAddressesButton = false;
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
  addressInputsReadOnly: boolean = false;
  forClearingInput1;
  forClearingInput2;
  matSpinnerDisplay = false;

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

  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private countryCallCodesService: CountryCallCodesService, private formatService: FormatService) { 

  }

  ////////////////////////////////////////////////////////////////////NGONINIT///////////////////////////////////////////////
  ngOnInit() {
    if(screen.width >= 992) {
      this.displayType = 'desktop';
    } else {
      this.displayType = 'mobile';
    }
    this.geoencoder_ = new google.maps.Geocoder;
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
      if(this.displayType === 'desktop'){
        let inputElmStart = <HTMLInputElement>document.getElementById('search');
        let inputElmEnd = <HTMLInputElement>document.getElementById('search2');
        let options = {
          componentRestrictions: {country: "za"}
        };
        this.autocompleteStart = new google.maps.places.Autocomplete(inputElmStart, options);
        this.autocompleteEnd = new google.maps.places.Autocomplete(inputElmEnd, options);
        this.autocompleteStart.addListener('place_changed', (res)=> {
          let address_ = this.autocompleteStart.getPlace();
          inputElmStart.value = address_.formatted_address;
          this.pickupAddress = address_.formatted_address;
          this.geoencoder_.geocode({'placeId': address_.place_id}, (results, status) =>{
            this.pickuplocation =  results[0].geometry.location;
          });
        });
        this.autocompleteEnd.addListener('place_changed', (res)=> {
          let address_ = this.autocompleteEnd.getPlace();
          inputElmEnd.value = address_.formatted_address;
          this.dropoffAddress = address_.formatted_address;
          this.geoencoder_.geocode({'placeId': address_.place_id}, (results, status) =>{
            this.dropofflocation =  results[0].geometry.location;
          });
        });
      } else {
        let inputElmStart = <HTMLInputElement>document.getElementById('search3');
        let inputElmEnd = <HTMLInputElement>document.getElementById('search4');
        let options = {
          componentRestrictions: {country: "za"}
        };
        this.autocompleteStart = new google.maps.places.Autocomplete(inputElmStart, options);
        this.autocompleteEnd = new google.maps.places.Autocomplete(inputElmEnd, options);
        this.autocompleteStart.addListener('place_changed', (res)=> {
          let address_ = this.autocompleteStart.getPlace();
          inputElmStart.value = address_.formatted_address;
          this.pickupAddress = address_.formatted_address;
          this.geoencoder_.geocode({'placeId': address_.place_id}, (results, status) =>{
            this.pickuplocation =  results[0].geometry.location;
          });
        });
        this.autocompleteEnd.addListener('place_changed', (res)=> {
          let address_ = this.autocompleteEnd.getPlace();
          inputElmEnd.value = address_.formatted_address;
          this.dropoffAddress = address_.formatted_address;
          this.geoencoder_.geocode({'placeId': address_.place_id}, (results, status) =>{
            this.dropofflocation =  results[0].geometry.location;
          });
        });
      }
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
    console.log(this.time);
    this.passengers = formModel1.passengerNumberCtrl;
    this.date = formModel1.dateCtrl;
    console.log(this.date);
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

  async calculateFareClickMobile() {
    this.calculateButton = false;
    this.matSpinnerDisplay = true;
    this.delay(300).then(any=>{
      this.trip_end = {location: this.dropofflocation, name: this.dropoffAddress};
      this.trip_start = {location: this.pickuplocation, name: this.pickupAddress};
      this.continueToBook = true;
      this.fareLabel = true;
      this.fareBasedOnDistance = '600';
      this.clearAddressesButton = true;
      this.mapRouteDisplay = true;
      this.addressInputsReadOnly = true;
      this.matSpinnerDisplay = false;
    });
  }
  async calculateFareClickDesktop() {
    this.calculateButton = false;
    this.matSpinnerDisplay = true;
    this.delay(300).then(any=>{
      this.trip_end = {location: this.dropofflocation, name: this.dropoffAddress};
      this.trip_start = {location: this.pickuplocation, name: this.pickupAddress};
      this.continueToBook = true;
      this.fareLabel = true;
      this.fareBasedOnDistance = '600';
      this.clearAddressesButton = true;
      this.mapRouteDisplay = true;
      this.addressInputsReadOnly = true;
      this.matSpinnerDisplay = false;
    });
  }

  backToInitialStep() {
    this.initialDivDisplay = true;
    this.stepperDiv = false;
    this.stepperOpen = this.stepperOpen === 'in' ? 'out' : 'in';
    this.continueToBook = false;
    this.calculateButton = true;
    this.fareLabel = false;
    this.clearAddressesButton = false;
    this.fareBasedOnDistance = '';
    this.mapRouteDisplay = false;
    this.addressInputsReadOnly = false;
    if (this.displayType === 'desktop') {
      this.forClearingInput1 = <HTMLInputElement>document.getElementById('search');
      this.forClearingInput2 = <HTMLInputElement>document.getElementById('search2');
    } else if (this.displayType === 'mobile') {
      this.forClearingInput1 = <HTMLInputElement>document.getElementById('search3');
      this.forClearingInput2 = <HTMLInputElement>document.getElementById('search4');
    }
    this.forClearingInput1.value = '';
    this.forClearingInput2.value = '';
  }

  continueToBookClick() {
    this.initialDivDisplay = false;
    this.stepperDiv = true;
    this.stepperOpen = this.stepperOpen === 'out' ? 'in' : 'out';
  }

  cleanInitialStep() {
    this.continueToBook = false;
    this.calculateButton = true;
    this.fareLabel = false;
    this.clearAddressesButton = false;
    this.fareBasedOnDistance = '';
    this.mapRouteDisplay = false;
    this.addressInputsReadOnly = false;
    if (this.displayType === 'desktop') {
      this.forClearingInput1 = <HTMLInputElement>document.getElementById('search');
      this.forClearingInput2 = <HTMLInputElement>document.getElementById('search2');
    } else if (this.displayType === 'mobile') {
      this.forClearingInput1 = <HTMLInputElement>document.getElementById('search3');
      this.forClearingInput2 = <HTMLInputElement>document.getElementById('search4');
    }
    this.forClearingInput1.value = '';
    this.forClearingInput2.value = '';
  }

  @HostListener('window:resize', ['$event'])onResize(event) {
    if(event.target.innerWidth >= 992 && this.displayType === 'mobile') {
      this.displayType = 'desktop';
      this.ngOnInit();
    } 
    if (event.target.innerWidth <= 992 && this.displayType === 'desktop') {
      this.displayType = 'mobile';
      this.ngOnInit();
    }
    
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), 1000)).then(()=>console.log("fired"));
}
}

