// manager-access-denied-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-manager-access-denied-dialog',
    template: `
      <h2>Access denied</h2>
      <p>{{ data.message }}</p>
    `,
  })
export class ManagerAccessDeniedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
