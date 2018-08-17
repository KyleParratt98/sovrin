import { Component, OnInit } from '@angular/core';
import { CountryCallCodesService } from '../../../../repeated-code/country-call-codes';

export interface Country {
  country: string;
  code: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  countryArray: Country[];
  selectedCode: string = '';
  lengthOfSelectedCode: number;
  userMobileNumber: string = '';
  finalMobileNumber: string = '';
  possibleZero: string = '';
  firstSlice:string = '';
  secondSlice:string = '';


  constructor(private CountryCallCodesService: CountryCallCodesService) { 
    this.countryArray = this.CountryCallCodesService.getCountryList();
  }

  ngOnInit() {
    
  }

  saveButtonClick() {
    this.lengthOfSelectedCode = this.selectedCode.length;
    console.log("length  = " + this.lengthOfSelectedCode);
    console.log("usermobile  = " + this.userMobileNumber);
    this.possibleZero = this.userMobileNumber.charAt(this.lengthOfSelectedCode);
    if ( this.possibleZero === "0") {
      this.firstSlice = this.userMobileNumber.slice(0, this.lengthOfSelectedCode);
      this.secondSlice = this.userMobileNumber.slice(this.lengthOfSelectedCode +1);
      this.finalMobileNumber = this.firstSlice + this.secondSlice;
    } else {
      this.finalMobileNumber = this.userMobileNumber;
    }

    console.log("final = " + this.finalMobileNumber);
  }
}
