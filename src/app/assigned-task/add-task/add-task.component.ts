import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../taskmodel';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() addTaskEvent = new EventEmitter<PeriodicElement>();
  // usernameOptions: string[] = ['Sooraj', 'Deepak', 'manu', 'jeevan', 'karthik'];
  usernameOptions: { id: number; first_name: string }[] = [];


  statusOptions: string[] = ['Completed', 'Assigned', 'Unassigned', 'Onprogress'];
  addTaskForm: FormGroup;
  ngOnInit() {
    // Fetch employee first names when the component is initialized
    this.fetchEmployeeUsernames();
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient 
  ) {
    this.addTaskForm = this.formBuilder.group({
      descreption: ['', Validators.required],
      location: ['', Validators.required],
      // first_name: ['', Validators.required],
      // username:['', Validators.required],
      // status: ['', Validators.required],
      // taskdetail:['', Validators.required],
      id: [null, Validators.required],
      
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  // onAddTaskClick(): void {
  //   if (this.addTaskForm.valid) {
  //     const newTask = this.addTaskForm.value;
  //     this.addTaskEvent.emit(newTask); 
  //     console.log('New Task Data:', newTask);
  //     this.dialogRef.close();
  //   }
  // }
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
  onAddTaskClick(): void {
    debugger;
    if (this.addTaskForm.valid) {
      const newTask = this.addTaskForm.value;
  
      // Make an HTTP POST request to your Django API endpoint
      this.http.post('https://albecoservice.com/jobapi/jobapi/WorkAssainViewset/', newTask)
        .subscribe(
          (response) => {
            // Handle the response from the backend (success)
            console.log('Response from backend:', response);
            this.addTaskEvent.emit(newTask); // Optionally emit an event if needed
            this.dialogRef.close();
          },
          (error) => {
            // Handle errors from the backend
            console.error('Error sending data to backend:', error);
          }
        );
    }
  }
}
