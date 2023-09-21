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
    const imgWidth = 80; // Set the desired width for the images
    const imgHeight = 60; // Set the desired height for the images
  
    // Set the font size
    pdf.setFontSize(12);
  
    // Define the margin for left alignment
    const margin = 10;
  
    // Define the line height for each line
    const lineHeight = 10;
  
    // Build the PDF content using the dialog data
    const content = `
      Description: ${this.data.descreption}
      Order ID: ${this.data.id}
      From Date: ${this.data.assigned_date}
      To Date: ${this.data.completion_date}
      Technician: ${this.data.Technician}
      Status: ${this.data.Status}
      Customer Details: ${this.data.property}
      Work Mode: ${this.data.WorkMode}
      Task Name: ${this.data.descreption}
      Payment Mode: ${this.data.PaymentMode}
      Location: ${this.data.location}
      Customer Phone No: ${this.data.CustomerPhoneNo}
    `;
  
    // Split the content into lines
    const lines = pdf.splitTextToSize(content, pdf.internal.pageSize.width - 2 * margin);
  
    // Calculate the required height based on the number of lines
    let requiredHeight = lines.length * lineHeight;
  
    // Load customer signature image
    const customerSignatureImg = new Image();
    customerSignatureImg.src = this.data.customer_signature;
  
    // Load technician signature image
    const technicianSignatureImg = new Image();
    technicianSignatureImg.src = this.data.employee_signature;
  
    // Load before and after photos
    const beforePhotoImg = new Image();
    beforePhotoImg.src = this.data.before_photo1;
  
    const afterPhotoImg = new Image();
    afterPhotoImg.src = this.data.after_photo1;
  
    // Calculate the additional height required for the images
    const totalImageHeight = 4 * (imgHeight + 10); // Four images with spacing
  
    // Check if the content and images fit on a single page
    if (requiredHeight + totalImageHeight <= pdf.internal.pageSize.height - 2 * margin) {
      // If it fits, add all the content and images to the first page
      lines.forEach((line: string, index: number) => {
        const yPos = margin + index * lineHeight;
        pdf.text(line, margin, yPos);
      });
  
      // Add text heading for customer signature image
      pdf.text('Customer Signature:', margin, requiredHeight + margin + 5); // Adjust the vertical position
  
      // Add customer signature image
      pdf.addImage(
        customerSignatureImg,
        'JPEG',
        margin,
        requiredHeight + margin + 15, // Adjust the vertical position
        imgWidth,
        imgHeight
      );
  
      // Add text heading for technician signature image
      pdf.text('Technician Signature:', margin + imgWidth + 20, requiredHeight + margin + 5); // Adjust the vertical position
  
      // Add technician signature image
      pdf.addImage(
        technicianSignatureImg,
        'JPEG',
        margin + imgWidth + 20, // Adjust the horizontal position
        requiredHeight + margin + 15, // Adjust the vertical position
        imgWidth,
        imgHeight
      );
  
      // Add text heading for before photo image
      pdf.text('Before Photo:', margin, requiredHeight + margin + imgHeight + 25); // Adjust the vertical position
  
      // Add before photo image
      pdf.addImage(
        beforePhotoImg,
        'JPEG',
        margin,
        requiredHeight + margin + imgHeight + 35, // Adjust the vertical position
        imgWidth,
        imgHeight
      );
  
      // Add text heading for after photo image
      pdf.text('After Photo:', margin + imgWidth + 20, requiredHeight + margin + imgHeight + 25); // Adjust the vertical position
  
      // Add after photo image
      pdf.addImage(
        afterPhotoImg,
        'JPEG',
        margin + imgWidth + 20, // Adjust the horizontal position
        requiredHeight + margin + imgHeight + 35, // Adjust the vertical position
        imgWidth,
        imgHeight
      );
    } else {
      let currentPage = 1;
      let remainingLines = [...lines];
  
      while (remainingLines.length > 0) {
        if (currentPage > 1) {
          pdf.addPage(); // Add a new page if it's not the first page
        }
        requiredHeight = 2 * margin; // Reset the height for the new page
  
        // Add content to the current page
        const currentPageLines = remainingLines.splice(0, Math.floor((pdf.internal.pageSize.height - 2 * margin) / lineHeight));
        currentPageLines.forEach((line: string, index: number) => {
          const yPos = requiredHeight + index * lineHeight;
          pdf.text(line, margin, yPos);
        });
  
        // Add text heading for customer signature image
        pdf.text('Customer Signature:', margin, requiredHeight + currentPageLines.length * lineHeight + 10);
  
        // Add customer signature image
        pdf.addImage(
          customerSignatureImg,
          'JPEG',
          margin,
          requiredHeight + currentPageLines.length * lineHeight + 20,
          imgWidth,
          imgHeight
        );
  
        // Add text heading for technician signature image
        pdf.text('Technician Signature:', margin + imgWidth + 20, requiredHeight + currentPageLines.length * lineHeight + 10);
  
        // Add technician signature image
        pdf.addImage(
          technicianSignatureImg,
          'JPEG',
          margin + imgWidth + 20,
          requiredHeight + currentPageLines.length * lineHeight + 20,
          imgWidth,
          imgHeight
        );
  
        // Add text heading for before photo image
        pdf.text('Before Photo:', margin, requiredHeight + currentPageLines.length * lineHeight + imgHeight + 30);
  
        // Add before photo image
        pdf.addImage(
          beforePhotoImg,
          'JPEG',
          margin,
          requiredHeight + currentPageLines.length * lineHeight + imgHeight + 40,
          imgWidth,
          imgHeight
        );
  
        // Add text heading for after photo image
        pdf.text('After Photo:', margin + imgWidth + 20, requiredHeight + currentPageLines.length * lineHeight + imgHeight + 30);
  
        // Add after photo image
        pdf.addImage(
          afterPhotoImg,
          'JPEG',
          margin + imgWidth + 20,
          requiredHeight + currentPageLines.length * lineHeight + imgHeight + 40,
          imgWidth,
          imgHeight
        );
  
        currentPage++;
      }
    }
  
    // Download the PDF
    pdf.save('details.pdf');
  }
}
