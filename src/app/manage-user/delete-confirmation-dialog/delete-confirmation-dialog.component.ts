import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from '../usermodel';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
  @Output() deleteUserEvent = new EventEmitter<PeriodicElement>();

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: PeriodicElement // Inject the selected user
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteUserClick(): void {
    // Emit the deleted user data
    this.deleteUserEvent.emit(this.user);
    this.dialogRef.close();
  }
}