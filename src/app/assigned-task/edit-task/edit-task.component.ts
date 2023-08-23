import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../taskmodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  @Output() editTaskEvent = new EventEmitter<PeriodicElement>();
  users: string[] = ['Sooraj', 'Deepak', 'manu', 'jeevan', 'karthik'];
  statusOptions: string[] = ['Completed', 'Assigned', 'Unassigned', 'Onprogress'];
  editTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: PeriodicElement // Inject the selected Task
  ) {
    this.editTaskForm = this.formBuilder.group({
      property: [task.property, Validators.required],
      username: [task.username, Validators.required],
      status:   [task.status, Validators.required],
      location: [task.location, Validators.required],
      taskdetail: [task.taskdetail, Validators.required]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onEditTaskClick(): void {
    if (this.editTaskForm.valid) {
      const updatedTask: PeriodicElement = { ...this.task, ...this.editTaskForm.value };
      this.editTaskEvent.emit(updatedTask);
      this.dialogRef.close();
    }
  }
}
