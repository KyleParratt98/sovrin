import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  initialDivDisplay = 'block';
  stepperDiv = 'none';
  stepperOpen: string;
  continueToBook = 'none';
  calculateButton = 'block';
  fareLabel = 'none';
  fareBasedOnDistance: string = '';
  clearAddressesButton = 'none';
  minDate = new Date();

  // TRANSFER VARIABLES
  pickupAddress: string = '650 Cicely Street, Garsfontein, Pretoria';
  dropoffAddress: string = 'O.R. Tambo International Airport';
  //////////////////////////////////////////

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  inputToggled = false;
  preparedByHintMessage = "Previous Names of Prepared By : 37 KG'S , ROOM - 15KG'S HFC-227 , KLERKSDORP PRISON , DEMO ROOM , 2 ROOMS , ECO BANK, ACCRA, GHANA , INERGEN , TIL JAGER , STRONG ROOMS , NEW SERVER ROOM , Credit Reference Bureau Africa ltd. , SERVER ROOM & FLOOR VOID , CHRIS HANI BARAGWANETH HOSPITAL , TRIANGULAR ROOM , BURGERSFORT , ROOM ONLY, NO VOIDS , NELSPRUIT , GHANA , HFC-125 SWOP OUT , ROOM & FLOOR VOID , ROOM ONLY , STANDARD BANK , ETHANOL STORE , MONT BLANC - BEDFORDVIEW , STANDARD BANK NAIROBI , 10 LITRE ECKOSHIELD , WATER SERVICES , INERGEN 300 BAR , HACO INDUSTRIES , JET PARK , SQUADRON - ALEXANDER BAY , SQUADRON - SLANGKOP , SQUADRON - UMDLOTI , SQUADRON - PHALABORWA , SQUADRON - LOUIS TRICHARDT , SQUADRON - BOEKENHOUTSKLOOF , SQUADRON - WONDERBOOM , SQUADRON - OLIFANTSHOEK , WATERKLOOF AIR FORCE BASE , COMPUTER CENTRE IN TANZANIA , FLOOR VOID , SNAKE VALLEY , JAQUAR - IRENE , KENYA INSTITUTE OF ADMINISTRATION , ESCONDIDA 3200 M ASL , PENSION SERVICES - PRETORIA , APOLLO - JET PARK , VCG , kjg;iug;iu , test , AOH , WIEKUS , Neil , Nick Collins , Nwh , a"
  countries: any;
  currencies: any;
  cylinders: any;
  warningMessage = "none";
  scrollUp: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyNameCtrl: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
      riskNameCtrl: ['', Validators.required],
    });
    this.stepperOpen = 'out';
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
