import { Component, OnInit } from '@angular/core';
import { Country, CountryCallCodesService } from '../../../services/country-call-code-service';
import { Validators, FormControl } from '@angular/forms';

const MOBILE_NUMBER_REGEX = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  tabIndex = 0;
  show: boolean = false;
  countryArray: Country[];
  selectedCode: string = '';
  lengthOfSelectedCode: number;
  userMobileNumber: string = '';
  userEmailAddress: string;
  selectedISO: any;
  mobileNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(MOBILE_NUMBER_REGEX)
]);


  constructor(private CountryCallCodesService: CountryCallCodesService) { 
    this.countryArray = this.CountryCallCodesService.getCountryList();
  }

  ngOnInit() {
  }
  nextTab() {
    this.tabIndex = this.tabIndex +1;
  }

  previousTab() {
    this.tabIndex = this.tabIndex  -1;
  }

  revealPassword() {
    this.show = !this.show;
  }

  resendOTP() {

  }

  loginClick() {
    
  }

}