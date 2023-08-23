import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from './usermodel';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent {
  displayedColumns: string[] = ['username', 'password', 'location', 'Action'];

  addUserForm: FormGroup;
  manageUserForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
   ELEMENT_DATA: PeriodicElement[] = [
    {username: 'sooraj', password: 'test123#', location: 'thrissur'},
    {username: 'deepak', password: 'test123#', location: 'EKM'},
    {username: 'Appu', password: 'test123#', location: 'PUK'},
    {username: 'jeevan', password: 'test123#', location: 'INK'},
    {username: 'manu', password: 'test123#', location: 'Ollur'},
    {username: 'kiran', password: 'test123#', location: 'thrissur'},
    {username: 'tito', password: 'test123#', location: 'thrissur'},
    {username: 'jhon', password: 'test123#', location: 'thrissur'},
    {username: 'deo', password:'test123#', location: 'thrissur'},
    { username: 'Neon', password: 'test123#', location: 'thrissur'},
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  formBuilder: any;
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    
       this.manageUserForm = this.fb.group({
        // username: ['', Validators.required],
        // password: ['', Validators.required],
        // location: ['', Validators.required]
      });
      this.addUserForm = this.fb.group({
        position: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        location: ['', Validators.required]
      });
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
  
  
}
