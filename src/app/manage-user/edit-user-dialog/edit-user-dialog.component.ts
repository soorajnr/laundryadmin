import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../usermodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
  @Output() editUserEvent = new EventEmitter<PeriodicElement>();

  editUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: PeriodicElement // Inject the selected user
  ) {
    this.editUserForm = this.formBuilder.group({
      username: [user.username, Validators.required],
      password1: [user.password1, Validators.required],
      
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onEditUserClick(): void {
    if (this.editUserForm.valid) {
      const updatedUser = this.editUserForm.value;
      this.editUserEvent.emit(updatedUser);
      this.dialogRef.close();
    }
  }
}
