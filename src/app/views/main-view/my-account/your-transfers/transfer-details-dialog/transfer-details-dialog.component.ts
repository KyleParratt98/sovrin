import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Transfer } from '../../../../../services/user-profile-service'

@Component({
  selector: 'app-transfer-details-dialog',
  templateUrl: './transfer-details-dialog.component.html',
  styleUrls: ['./transfer-details-dialog.component.css'],
})
export class TransferDetailsDialog {

  constructor(public dialogRef: MatDialogRef<TransferDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public selectedTransfer: Transfer
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  printInvoice(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
