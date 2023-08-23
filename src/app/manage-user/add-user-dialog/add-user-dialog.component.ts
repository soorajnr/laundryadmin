import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../usermodel';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
})
export class AddUserDialogComponent {
  @Output() addUserEvent = new EventEmitter<PeriodicElement>();

  addUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddUserClick(): void {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;
      this.addUserEvent.emit(newUser); 
      console.log('New User Data:', newUser);
      this.dialogRef.close();
    }
  }
  
}