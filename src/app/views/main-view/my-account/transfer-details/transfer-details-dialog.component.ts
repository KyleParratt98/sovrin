import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Transfer {
  date: string;
  time: string;
  price: string;
  tripScreenshot: string;
}

@Component({
  selector: 'app-transfer-details-dialog',
  templateUrl: './transfer-details-dialog.component.html',
  styleUrls: ['./transfer-details-dialog.component.css']
})
export class TransferDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<TransferDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public selectedTransfer: Transfer) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
