
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from './taskmodel';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.scss']
})
export class AssignedTaskComponent {
  // displayedColumns: string[] = ['property', 'username', 'location', 'status','taskdetail', 'action'];
  addTaskForm: FormGroup;
  assignedTaskForm: FormGroup;
  displayedColumns: string[] = [
    'property',
    'username',
    'location',
    'status',
    'taskdetail',
    'action',
  ];
  //  ELEMENT_DATA: PeriodicElement[] = [
  //   {property: 'wirlpool', username: 'Sooraj', location: 'thrissur', status: 'Completed', taskdetail: 'test descri'},
  //   {property: 'wirlpool', username: 'Deepak', location: 'EKM', status: 'Assigned', taskdetail: 'test descri'},
  //   {property: 'wirlpool', username: 'manu', location: 'PUK', status: 'Assigned', taskdetail: 'test descri'},
  //   {property: 'wirlpool', username: 'manu', location: 'INK', status: 'Assigned', taskdetail: 'test descri'},
  //   {property: 'wirlpool', username: 'jeevan', location: 'Ollur', status: 'Assigned', taskdetail: 'test descri'},
  //   {property: 'wirlpool', username: 'karthik', location: 'thrissur', status: 'Assigned', taskdetail: 'test descri'}
  // ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor(private fb: FormBuilder, private dialog: MatDialog,private http: HttpClient) {
    
       this.assignedTaskForm = this.fb.group({
        // username: ['', Validators.required],
        // password: ['', Validators.required],
        // location: ['', Validators.required]
      });

      this.addTaskForm = this.fb.group({
        property: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        location: ['', Validators.required],
        taskdetail: ['', Validators.required],
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

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '500px'
    });

    dialogRef.componentInstance.addTaskEvent.subscribe(newTask => {
      debugger;
      this.ELEMENT_DATA.push(newTask);
      this.dataSource.data = this.ELEMENT_DATA.slice(); 
    });
  }

  editTask(task: PeriodicElement) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '500px',
      data: task 
    });
  
    dialogRef.componentInstance.editTaskEvent.subscribe(updatedTask => {
      const index = this.ELEMENT_DATA.findIndex(u => u === task);
      if (index !== -1) {
        this.ELEMENT_DATA[index] = updatedTask;
        this.dataSource.data = this.ELEMENT_DATA.slice(); 
      }
    });
  }

  deleteUser(task: PeriodicElement) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '300px',
      data: task
    });

    dialogRef.componentInstance.deleteTaskEvent.subscribe(deletedTask => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(u => u !== deletedTask);
      this.dataSource.data = this.ELEMENT_DATA.slice();
    });
  }


  fetchDataFromAPI(): void {
    // Make an HTTP GET request to your Django API endpoint
    this.http
      .get<PeriodicElement[]>('https://albecoservice.com/jobapi/jobapi/AssignedJobCardViewSet/')
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
