import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-failure-dialog',
  template: `
    <h2>Login Failure</h2>
    <p>{{ data.message }}</p>
  `,
})
export class LoginFailureDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
