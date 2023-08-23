import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../taskmodel';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {
  @Output() deleteTaskEvent = new EventEmitter<PeriodicElement>();

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: PeriodicElement // Inject the selected user
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteUserClick(): void {
    // Emit the deleted user data
    this.deleteTaskEvent.emit(this.task);
    this.dialogRef.close();
  }
}
