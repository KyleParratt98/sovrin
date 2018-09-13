import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryCallCodesService, Country } from '../../repeated-code/country-call-codes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  countryArray: Country[];

  constructor(private router: Router, private countryCallService: CountryCallCodesService) { }

  ngOnInit() {
    this.countryArray = this.countryCallService.getCountryList();
  }

  signUpClick() {
    this.router.navigateByUrl("/sign-up");
  }
}
