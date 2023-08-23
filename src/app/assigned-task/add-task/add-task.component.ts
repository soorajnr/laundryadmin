import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../taskmodel';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() addTaskEvent = new EventEmitter<PeriodicElement>();
  usernameOptions: string[] = ['Sooraj', 'Deepak', 'manu', 'jeevan', 'karthik'];
  statusOptions: string[] = ['Completed', 'Assigned', 'Unassigned', 'Onprogress'];
  addTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addTaskForm = this.formBuilder.group({
      property: ['', Validators.required],
      location: ['', Validators.required],
      username: ['', Validators.required],
      status: ['', Validators.required],
      taskdetail:['', Validators.required]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddTaskClick(): void {
    if (this.addTaskForm.valid) {
      const newTask = this.addTaskForm.value;
      this.addTaskEvent.emit(newTask); 
      console.log('New Task Data:', newTask);
      this.dialogRef.close();
    }
  }
}
