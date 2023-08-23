import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponentComponent } from './detail-dialog-component/detail-dialog-component.component';
import { PeriodicElement } from './dashboardmodel';
import { MatPaginator } from '@angular/material/paginator';



const ELEMENT_DATA: PeriodicElement[] = [
  { 
    Products: 'Wirpool',
    OderID: 1235, 
    FromDate: new Date('2023-08-01'), 
    ToDate: new Date('2023-08-05'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Sooraj', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },
  { 
    Products: 'HP',
    OderID: 1234, 
    FromDate: new Date('2023-08-01'), 
    ToDate: new Date('2023-08-05'),    
    Status: 'Completed',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Kiran', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },
  { 
    Products: 'HP',
    OderID: 1237, 
    FromDate: new Date('2023-08-03'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Completed',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Siva', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },
  { 
    Products: 'HP',
    OderID: 1238, 
    FromDate: new Date('2023-08-05'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Manu', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },
  { 
    Products: 'HP',
    OderID: 1238, 
    FromDate: new Date('2023-08-05'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Manu', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },  { 
    Products: 'HP',
    OderID: 1238, 
    FromDate: new Date('2023-08-05'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Manu', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },  { 
    Products: 'HP',
    OderID: 1238, 
    FromDate: new Date('2023-08-05'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Manu', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },  { 
    Products: 'HP',
    OderID: 1238, 
    FromDate: new Date('2023-08-05'), 
    ToDate: new Date('2023-08-09'),    
    Status: 'Assigned',
    CompanyDetails: 'Abelco Equipment Trading LLC 1006597086 abelco.me 9HW8+CQ8 - Shop #1 - ??????? - ????? -  United Arab Emirates admin@abelco.me',
    CustomerDetails :'Ajman - United Arab Emirates',
    WorkMode :'New Installation',
    TaskName :'Trial',
    PaymentMode: 'AMC',
    Technician: 'Manu', 
    CustomerName: 'Deepa', 
    CustomerPhoneNo: 'N/A', 
    CustomerSignature: 'N/A', 
    TechnicianSignature:'N/A',
    TechnicianPhoneNo:'N/A',
    FieldBeforePhoto:'N/A',
    FieldAfterPhoto:'N/A'
  },
 
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Products','OderID','FromDate','ToDate', 'Technician', 'Status', 'Action'];
  @ViewChild('picker') picker: any; // Use appropriate type
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  DashboardForm = new FormGroup({
    FromDate: new FormControl(),
    ToDate: new FormControl(),
  });

  constructor(private dialog: MatDialog) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  applyDateRangeFilter() {
    const fromDate: Date | null = this.DashboardForm.controls['FromDate'].value;
    const toDate: Date | null = this.DashboardForm.controls['ToDate'].value;

    if (fromDate && toDate) {
      this.dataSource.filterPredicate = (data: PeriodicElement) => {
        return data.FromDate >= fromDate && data.ToDate <= toDate;
      };

      this.dataSource.filter = 'filter'; // Trigger the filter
    }
  }

  clearDateRangeFilter() {
    this.DashboardForm.reset();
    //this.dataSource.filterPredicate = null;
    this.dataSource.filter = '';
  }
  
  viewDetails(rowData: PeriodicElement) {
    // Open a dialog to display details
    const dialogRef = this.dialog.open(DetailDialogComponentComponent, {
      data: rowData, // Pass the row's data to the dialog
      width: '500px', // Adjust the width as needed
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
