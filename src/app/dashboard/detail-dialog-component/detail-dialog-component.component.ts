import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../dashboardmodel';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-detail-dialog-component',
  templateUrl: './detail-dialog-component.component.html',
  styleUrls: ['./detail-dialog-component.component.scss']
})
export class DetailDialogComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {}
  downloadPdf(): void {
    const pdf = new jsPDF();
    
    // Build the PDF content using the dialog data
    const content = `
      Product: ${this.data.Products}
      Order ID: ${this.data.OderID}
      From Date: ${this.data.FromDate}
      To Date: ${this.data.ToDate}
      Technician: ${this.data.Technician}
      Status: ${this.data.Status}
      CustomerDetails: ${this.data.CustomerDetails}
      WorkMode: ${this.data.WorkMode}
      TaskName: ${this.data.TaskName}
      PaymentMode: ${this.data.PaymentMode}
      CustomerName: ${this.data.CustomerName}
      CustomerPhoneNo: ${this.data.CustomerPhoneNo}
      CustomerSignature: ${this.data.CustomerSignature}
      TechnicianSignature: ${this.data.TechnicianSignature}
      TechnicianPhoneNo: ${this.data.TechnicianPhoneNo}
      FieldBeforePhoto: ${this.data.FieldBeforePhoto}
      FieldAfterPhoto: ${this.data.FieldAfterPhoto}
    `;
    
    // Add content to PDF
    pdf.text(content, 10, 10);
    
    // Download the PDF
    pdf.save('details.pdf');
  }
}
