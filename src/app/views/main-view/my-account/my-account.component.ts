import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  currentPage = 'Profile';
  myAccountMenuIcon = 'keyboard_arrow_down';
  displayMenu = 'none';
  profilePage = 'block';
  paymentsPage = 'none';
  yourTransfersPage = 'none';


  constructor() {
  }

  ngOnInit() {

  }

  MenuOpen() {
    if (this.myAccountMenuIcon == 'keyboard_arrow_down') {
      this.displayMenu = 'block';
      this.myAccountMenuIcon = 'keyboard_arrow_up';
    } else {
      this.myAccountMenuIcon = 'keyboard_arrow_down';
      this.displayMenu = 'none';
    }
  }

  pageChange(pageName) {
    this.currentPage = pageName;
    if (this.currentPage == 'Profile') {
      this.profilePage = 'block';
      this.yourTransfersPage = 'none';
      this.paymentsPage = 'none';
    }
    if (this.currentPage == 'Your Transfers') {
      this.yourTransfersPage = 'block';
      this.paymentsPage = 'none';
      this.profilePage = 'none';
    }
    if (this.currentPage == 'Payment') {
      this.paymentsPage = 'block';
      this.profilePage = 'none';
      this.yourTransfersPage = 'none';
    }
    this.displayMenu = 'none';
    this.myAccountMenuIcon = 'keyboard_arrow_down';
  }
}

