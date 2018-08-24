import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Transfer } from '../../../../../interfaces/transfer-interface'

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
    // const printContent = document.getElementById("print-section");
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();

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
