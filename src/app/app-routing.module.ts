import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ReportsComponent } from './reports/reports.component';
import { AssignedTaskComponent } from './assigned-task/assigned-task.component';
import { LoginComponent } from './login/login.component';

 interface CustomRoute extends Route {
  data?: {
    label?: string;
    icon?: string;
  };
}
export const routes: CustomRoute[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, data: { label: 'Dashboard', icon: 'dashboard' } },
  { path: 'manageuser', component: ManageUserComponent, data: { label: 'Manage User', icon: 'group' } },
  { path: 'assignedtask', component: AssignedTaskComponent, data: { label: 'Assigned Task', icon: 'summarize' } },
  { path: 'reports', component: ReportsComponent, data: { label: 'Reports', icon: 'summarize' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
