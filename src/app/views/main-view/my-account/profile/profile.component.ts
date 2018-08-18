import { Component, OnInit } from '@angular/core';
import { CountryCallCodesService } from '../../../../repeated-code/country-call-codes';

export interface Country {
  country: string;
  code: string;
}

export interface FavouriteAddress {
  address: string;
  counter: number;
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
  favouriteAddresses: FavouriteAddress[] = [
    {address: "650 Cicely Street", counter: 1},
  ];
  firstAddressInput: string;
  secondAddressInput: string;
  isSecondAddress: boolean = false;
  displaySecondAddressInput  = 'none';
  displayAdditionalBut: boolean = true;


  constructor(private CountryCallCodesService: CountryCallCodesService) { 
    this.countryArray = this.CountryCallCodesService.getCountryList();
  }

  ngOnInit() {
    this.firstAddressInput = this.favouriteAddresses[0].address;
    if( this.favouriteAddresses.length > 1) {
      this.secondAddressInput = this.favouriteAddresses[1].address;
      this.isSecondAddress = true;
      this.displayAdditionalBut = false;
    }
    
  }

  additionalAddressClick() {
    this.displaySecondAddressInput  = 'block';
    
  }

  saveButtonClick() {
    this.lengthOfSelectedCode = this.selectedCode.length;
    this.possibleZero = this.userMobileNumber.charAt(this.lengthOfSelectedCode);
    if ( this.possibleZero === "0") {
      this.firstSlice = this.userMobileNumber.slice(0, this.lengthOfSelectedCode);
      this.secondSlice = this.userMobileNumber.slice(this.lengthOfSelectedCode +1);
      this.finalMobileNumber = this.firstSlice + this.secondSlice;
    } else {
      this.finalMobileNumber = this.userMobileNumber;
    }
    this.favouriteAddresses.push({address: this.secondAddressInput , counter: 2});
    console.log(this.favouriteAddresses);
  }
}
