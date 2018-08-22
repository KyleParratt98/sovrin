import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TransferDetailsDialog } from '../transfer-details/transfer-details-dialog.component';

export interface Transfer {
  date: string;
  time: string;
  price: string;
  tripScreenshot: string;
  details: string;
}

@Component({
  selector: 'app-your-transfers',
  templateUrl: './your-transfers.component.html',
  styleUrls: ['./your-transfers.component.css']
})
export class YourTransfersComponent implements OnInit {

  pastTransfersArray: Transfer[] = [
    {date: "06/01/2018", time: "18:45", price: "R 105.53", tripScreenshot: "", details: "past 1 details"},
  ];
  upcomingTransfersArray: Transfer[] = [
    {date: "06/01/2018", time: "18:45", price: "R 105.53", tripScreenshot: "", details: "upcoming 1 details"},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
    {date: "", time: "", price: "", tripScreenshot: "", details: ""},
  ];
  pastTransfersArrayLength: number;
  upcomingTransfersArrayLength: number;
  selectedTransfer: Transfer;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.upcomingTransfersArrayLength = this.upcomingTransfersArray.length;
    this.pastTransfersArrayLength = this.pastTransfersArray.length;
  }

  viewTransferDetails(transferIndex: number, tripType: string): void {
    if (tripType == 'past') {
      this.selectedTransfer = this.pastTransfersArray[transferIndex];
    }
    if (tripType == 'upcoming') {
      this.selectedTransfer = this.upcomingTransfersArray[transferIndex];
    }

    const dialogRef = this.dialog.open(TransferDetailsDialog, {
      data: this.selectedTransfer
    });
  }

}
