import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailDialogComponentComponent } from './dashboard/detail-dialog-component/detail-dialog-component.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DeleteConfirmationDialogComponent } from './manage-user/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from './manage-user/edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './manage-user/add-user-dialog/add-user-dialog.component';
import { AssignedTaskComponent } from './assigned-task/assigned-task.component';
import { AddTaskComponent } from './assigned-task/add-task/add-task.component';
import { EditTaskComponent } from './assigned-task/edit-task/edit-task.component';
import { DeleteTaskComponent } from './assigned-task/delete-task/delete-task.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageUserComponent,
    DetailDialogComponentComponent,
    DeleteConfirmationDialogComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
    AssignedTaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    PdfViewerModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [
    DeleteConfirmationDialogComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
