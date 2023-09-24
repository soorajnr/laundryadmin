import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponentComponent } from './detail-dialog-component/detail-dialog-component.component';
import { PeriodicElement } from './dashboardmodel';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Products','OderID','StartDate','CompletedDate', 'Technician', 'Status', 'Action'];
  usernameOptions: { id: number; first_name: string }[] = [];
  itemCountText = ''; 
  onProcessCount: number = 0; // To store the count of items on process
  assignedCount: number = 0; // To store the count of items assigned
  @ViewChild('picker') picker: any; // Use appropriate type
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ELEMENT_DATA: PeriodicElement[] = [];
  DashboardForm!: FormGroup;

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(private dialog: MatDialog,private http: HttpClient,private router: Router, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    // Fetch data from the API when the component is initialized
    this.fetchDataFromAPI();
    this.fetchEmployeeUsernames()
    this.fetchCounts();
    this.DashboardForm = this.fb.group({
      FromDate: [''], // Initial value for FromDate control
      ToDate: [''],
      CmnSearch:[''],   // Initial value for ToDate control
  });
  }
  navigateToAssignedTask() {
    this.router.navigate(['/assignedtask']);
  }
  navigateToonprocessTask() {
    this.router.navigate(['/onprocesstask']);
  }
  navigateToReports() {
    this.router.navigate(['/reports']);
  }
  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  applyDateRangeFilter() {
    const fromDateControl = this.DashboardForm.get('FromDate');
    const toDateControl = this.DashboardForm.get('ToDate');
  
    if (fromDateControl && toDateControl) {
      const fromDate = fromDateControl.value;
      const toDate = toDateControl.value;
  
      // Format fromDate and toDate
      const formattedFromDate = this.formatDate(new Date(fromDate));
      const formattedToDate = this.formatDate(new Date(toDate));
  
      // Filter the data based on the date range (formattedFromDate to formattedToDate)
      this.dataSource.data = this.ELEMENT_DATA.filter((element) => {
        const startDate = new Date(element.assigned_date);
        const completedDate = new Date(element.completion_date);
        const formattedStartDate = this.formatDate(startDate);
        const formattedCompletedDate = this.formatDate(completedDate);
        return formattedStartDate >= formattedFromDate && formattedCompletedDate <= formattedToDate;
      });
    }
  }
  
  

  clearDateRangeFilter() {
    this.DashboardForm.reset();
    this.dataSource.data = this.ELEMENT_DATA;
    this.dataSource.filter = '';
    const cmnSearchControl = this.DashboardForm.get('CmnSearch');
    if (cmnSearchControl) {
      cmnSearchControl.setValue('');
    }
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
  fetchDataFromAPI(): void {
    // Make an HTTP GET request to your Django API endpoint
    this.http
      .get<PeriodicElement[]>('https://albecoservice.com/jobapi/jobapi/CompletedJobCardViewSet/')
      .subscribe(
        (data) => {
          this.ELEMENT_DATA = data;
          this.dataSource.data = this.ELEMENT_DATA.slice();
          const itemCount = this.ELEMENT_DATA.length;
          if (itemCount > 100) {
            this.itemCountText = '100+';
          } else {
            this.itemCountText = itemCount.toString();
          }
        },
        (error) => {
          console.error('Error fetching data from API:', error);
        }
      );
  }

  fetchEmployeeUsernames(): void {
    this.http.get<{ id: number; first_name: string }[]>('https://albecoservice.com/userapi/employee-usernames/').subscribe(
      (data) => {
    this.usernameOptions = data;
    console.log('usernameOptions:', this.usernameOptions);
      },
      (error) => {
        console.error('Error fetching employee usernames:', error);
      }
    );
  }
  getUsernameById(employeeId: number | null): string {
    if (!employeeId || !this.usernameOptions) {
      return ''; // Handle cases where employeeId is null or options are not loaded yet
    }
  
    const user = this.usernameOptions.find((user) => user.id === employeeId);
    return user ? user.first_name : ''; // Return the username if found
  }

  fetchCounts(): void {
    // Make an HTTP GET request to fetch on process and assigned counts
    this.http
      .get<any>('https://albecoservice.com/jobapi/counts/')
      .subscribe(
        (data) => {
          // Extract and store the counts
          this.onProcessCount = data.onProcessCount;
          this.assignedCount = data.assignedCount;
        },
        (error) => {
          console.error('Error fetching counts from API:', error);
        }
      );
  }
}
