import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from '../usermodel';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
  @Output() deleteUserEvent = new EventEmitter<PeriodicElement>();

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: PeriodicElement ,// Inject the selected user
    private http: HttpClient
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteUserClick(): void {
    // Send a DELETE request to the backend to delete the user
    this.http.delete<void>(`https://albecoservice.com/userapi/delete-user/${this.user.id}`).subscribe(
      () => {
        console.log(`User with ID ${this.user.id} deleted successfully`);
        this.deleteUserEvent.emit(this.user); // Emit the deleted user data
        this.dialogRef.close();
      },
      (error) => {
        console.error(`Error deleting user with ID ${this.user.id}:`, error);
      }
    );
  }
}