import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Transfer, UserProfileService, UserDetails, PriceOfExtras } from '../../../../../../services/user-profile-service'
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-printable-invoice',
  templateUrl: './printable-invoice.component.html',
  styleUrls: ['./printable-invoice.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PrintableInvoiceComponent implements OnInit {
  userDetails: UserDetails;
  sovrinBlue: '#ff4081';
  priceOfExtras: PriceOfExtras;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedTransfer: Transfer,
    public userProfileService: UserProfileService) {
      this.userDetails = this.userProfileService.getUserDetails();
      this.priceOfExtras = this.userProfileService.getPriceOfExtras();
      console.log("baby" + this.selectedTransfer.babySeat);
      console.log("trailer" + this.selectedTransfer.trailer);
   }

  ngOnInit() {
  }

}
