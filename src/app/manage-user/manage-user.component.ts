import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from './usermodel';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent {
  displayedColumns: string[] = ['username', 'id', 'first_name','last_name' ];

  addUserForm: FormGroup;
  manageUserForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA: PeriodicElement[] = [];
   
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  formBuilder: any;
  constructor(private fb: FormBuilder, private dialog: MatDialog,private http: HttpClient,) {
    
       this.manageUserForm = this.fb.group({
        // username: ['', Validators.required],
        // password: ['', Validators.required],
        // location: ['', Validators.required]
      });
      this.addUserForm = this.fb.group({
        position: ['', Validators.required],
        id: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    // Fetch data from the API when the component is initialized
    this.fetchDataFromAPI();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px'
    });

    dialogRef.componentInstance.addUserEvent.subscribe(newUser => {
      debugger;
      this.ELEMENT_DATA.push(newUser);
      this.dataSource.data = this.ELEMENT_DATA.slice(); 
    });
  }
  
  

  deleteUser(user: PeriodicElement) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: user
    });

    dialogRef.componentInstance.deleteUserEvent.subscribe(deletedUser => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(u => u !== deletedUser);
      this.dataSource.data = this.ELEMENT_DATA.slice();
    });
  }

  editUser(user: PeriodicElement) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '300px',
      data: user // Pass the selected user to the edit dialog
    });
  
    dialogRef.componentInstance.editUserEvent.subscribe(updatedUser => {
      // Find the index of the user in the array and update it
      const index = this.ELEMENT_DATA.findIndex(u => u === user);
      if (index !== -1) {
        this.ELEMENT_DATA[index] = updatedUser;
        this.dataSource.data = this.ELEMENT_DATA.slice(); // Refresh the data source
      }
    });
  }
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  fetchDataFromAPI(): void {
    // Make an HTTP GET request to your Django API endpoint
    this.http
      .get<PeriodicElement[]>('https://albecoservice.com/albecoproject/userapi/employee-usernames/')
      .subscribe(
        (data) => {
          this.ELEMENT_DATA = data;
          this.dataSource.data = this.ELEMENT_DATA.slice();
        },
        (error) => {
          console.error('Error fetching data from API:', error);
        }
      );
  }
}
