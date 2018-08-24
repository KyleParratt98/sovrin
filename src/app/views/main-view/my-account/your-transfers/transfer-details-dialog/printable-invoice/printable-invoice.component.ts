import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-printable-invoice',
  templateUrl: './printable-invoice.component.html',
  styleUrls: ['./printable-invoice.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PrintableInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('content') content: ElementRef;

  downloadPDF(): void {

    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    }

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15 , {
      'width': 190,
      'elementHandlers': specialElementHandlers 
    });

    doc.save('test.pdf');

  }

}
