import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  tabIndex = 0;

  constructor() { }

  ngOnInit() {
  }
  nextTab() {
    this.tabIndex = this.tabIndex +1;
  }

  previousTab() {
    this.tabIndex = this.tabIndex  -1;
  }

}
