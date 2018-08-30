import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TransferDetailsDialog } from '../your-transfers/transfer-details-dialog/transfer-details-dialog.component';
import { Transfer, UserProfileService } from '../../../../services/user-profile-service'

@Component({
  selector: 'app-your-transfers',
  templateUrl: './your-transfers.component.html',
  styleUrls: ['./your-transfers.component.css']
})
export class YourTransfersComponent implements OnInit {
  pastTransfersArray: Transfer[];
  upcomingTransfersArray: Transfer[];
  pastTransfersArrayLength: number;
  upcomingTransfersArrayLength: number;
  selectedTransfer: Transfer;

  constructor(
    public dialog: MatDialog,
    public userProfileService: UserProfileService,    
  ) { }

  ngOnInit() {
    this.pastTransfersArray = this.userProfileService.getPastTransfers();
    this.upcomingTransfersArray = this.userProfileService.getUpcomingTransfers();
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
