import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../taskmodel';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {
  @Output() deleteTaskEvent = new EventEmitter<PeriodicElement>();

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: PeriodicElement,
    private http: HttpClient // Inject HttpClient
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteTaskClick(): void {
    // Send a DELETE request to the backend to delete the task
    this.http.delete<void>(`http://your-api-url/delete-task/${this.task.id}`).subscribe(
      () => {
        console.log(`Task with ID ${this.task.id} deleted successfully`);
        this.deleteTaskEvent.emit(this.task); // Emit the deleted task data
        this.dialogRef.close();
      },
      (error) => {
        console.error(`Error deleting task with ID ${this.task.id}:`, error);
      }
    );
  }
}
