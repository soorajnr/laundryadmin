import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
})
export class AddUserDialogComponent {
  @Output() addUserEvent = new EventEmitter<any>();

  addUserForm: FormGroup;
  userRoles: string[] = ['employee', 'manager'];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      user_role: ['', Validators.required]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddUserClick(): void {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;

      this.http.post('https://albecoservice.com/userapi/usercreation/', newUser).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
