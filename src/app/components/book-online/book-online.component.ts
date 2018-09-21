/// <reference types="@types/googlemaps" />
import { forwardRef } from '@angular/core';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import { format } from 'libphonenumber-js';
import { Country, CountryCallCodesService } from '../../services/country-call-code-service';
import { FormatService } from '../../services/format.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { MapRouteComponent } from './map-route/map-route.component';
import { TransferDistanceService } from '../../services/transfer-distance.service';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_NUMBER_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const PASSENGER_NUMBER_REGEX = /^(?=.*[1-4])/;
const RATE_PER_KM = 8.5;
const COST_FOR_TRAILER = 150;
const COST_FOR_BABYSEAT = 50;

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
    TransferDistanceService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class BookOnlineComponent implements OnInit {

  trip_start: google.maps.LatLng;
  trip_end: google.maps.LatLng;
  autocompleteStart;
  autocompleteEnd;
  dropofflocation;
  pickuplocation;
  inputElmStart: any;
  inputElmEnd: any;

  displayType;
  mapRouteDisplay = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  initialDivDisplay = 'block';
  stepperDiv = false;
  stepperOpen: string;
  continueToBook = false;
  calculateButton = true;
  fareLabel = false;
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
  matSpinnerDisplay = false;
  addressOneEntered = false;
  addressTwoEntered = false;
  showPickupAddressError = false;
  showDropoffAddressError = false;

  ///// TRANSFER VARIABLES//////////////////////////////////////
  pickupAddress: string = '';
  dropoffAddress: string = '';
  date: string;
  time: string;
  passengers: number;
  babySeat: boolean = false;
  trailer: boolean = false;
  transferFare: number = 450;
  distanceFare: number;
  transferDistance: number;
  email: string;
  mobileNumber: string;
  ///////////////////////////////////////////////////////////////

  constructor(
    private _formBuilder: FormBuilder, 
    private mapsAPILoader: MapsAPILoader, 
    private countryCallCodesService: CountryCallCodesService, 
    private formatService: FormatService,
    private transferDistanceService: TransferDistanceService,
    ) { }

  ////////////////////////////////////////////////////////////////////NGONINIT///////////////////////////////////////////////
  ngOnInit() {
    if(screen.width >= 992) {
      this.displayType = 'desktop';
    } else {
      this.displayType = 'mobile';
    }
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
    this.initiateInputs();
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////// Controls /////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// form submission buttons on each step ////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async calculateFareClick() {
    if (this.addressOneEntered && this.addressTwoEntered) {
      this.calculateButton = false;
      this.matSpinnerDisplay = true;
      this.delay(500).then(any=>{
        this.trip_end = this.dropofflocation;
        this.trip_start = this.pickuplocation;
        this.continueToBook = true;
        this.clearAddressesButton = true;
        this.mapRouteDisplay = true;
        this.addressInputsReadOnly = true;
        this.matSpinnerDisplay = false;
        this.fareLabel = true;
        this.transferDistance = this.transferDistanceService.getTransferDistance();
        this.distanceFare = Math.ceil(this.transferDistance * RATE_PER_KM);
        this.showPickupAddressError = false;
        this.showDropoffAddressError = false;
      });
    } else if (!this.addressOneEntered && this.addressTwoEntered){
      this.showPickupAddressError = true;
      this.showDropoffAddressError = false;
    } else if (this.addressOneEntered && !this.addressTwoEntered){
      this.showPickupAddressError = false;
      this.showDropoffAddressError = true;
    } else {
      this.showPickupAddressError = true;
      this.showDropoffAddressError = true;
    }
    
  }

  backToInitialStep() {
    this.initialDivDisplay = 'block';
    this.stepperDiv = false;
    this.stepperOpen = this.stepperOpen === 'in' ? 'out' : 'in';
    this.continueToBook = false;
    this.calculateButton = true;
    this.fareLabel = false;
    this.clearAddressesButton = false;
    this.mapRouteDisplay = false;
    this.addressInputsReadOnly = false;
    this.addressOneEntered = false;
    this.addressTwoEntered = false;
    this.initiateInputs();
    this.inputElmStart.value = '';
      this.inputElmEnd.value = '';
  }

  cleanInitialStep() {
    this.continueToBook = false;
    this.calculateButton = true;
    this.fareLabel = false;
    this.clearAddressesButton = false;
    this.mapRouteDisplay = false;
    this.addressInputsReadOnly = false;
    this.initiateInputs();
    this.addressOneEntered = false;
    this.addressTwoEntered = false;
    this.inputElmStart.value = '';
      this.inputElmEnd.value = '';
  }

  continueToBookClick() {
    this.initialDivDisplay = 'none';
    this.stepperDiv = true;
    this.stepperOpen = this.stepperOpen === 'out' ? 'in' : 'out';
  }

  initiateInputs() {
    let options = {
      componentRestrictions: {country: "za"}
    };
    this.mapsAPILoader.load().then( () => {
      if (this.displayType === 'desktop') {
        this.inputElmStart = <HTMLInputElement>document.getElementById('search');
        this.inputElmEnd = <HTMLInputElement>document.getElementById('search2');
      } else {
        this.inputElmStart = <HTMLInputElement>document.getElementById('search3');
        this.inputElmEnd = <HTMLInputElement>document.getElementById('search4');
      }
      this.autocompleteStart = new google.maps.places.Autocomplete(this.inputElmStart, options);
      this.autocompleteEnd = new google.maps.places.Autocomplete(this.inputElmEnd, options);
      this.autocompleteStart.addListener('place_changed', (res)=> {
        let address_ = this.autocompleteStart.getPlace();
        this.addressOneEntered = true;
        this.pickupAddress = address_.formatted_address;
        this.pickuplocation = address_.geometry.location;
      });
      this.autocompleteEnd.addListener('place_changed', (res)=> {
        let address_ = this.autocompleteEnd.getPlace();
        this.addressTwoEntered = true;
        this.dropoffAddress = address_.formatted_address;
        this.dropofflocation = address_.geometry.location;
      });
    });
  }

  @HostListener('window:resize', ['$event'])onResize(event) {
    if(event.target.innerWidth >= 992 && this.displayType === 'mobile') {
      this.displayType = 'desktop';
      this.initiateInputs();
    } else if (event.target.innerWidth <= 992 && this.displayType === 'desktop') {
      this.displayType = 'mobile';
      this.initiateInputs();
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>'');
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

}

