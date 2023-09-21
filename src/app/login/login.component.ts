import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginFailureDialogComponent } from './login-failure-dailog.component'; // Import your login failure dialog component
import { ManagerAccessDeniedDialogComponent } from './manager-access-denied-dailog.component'; // Import your manager access denied dialog component

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  hide = true;
  username: string = '';
  password: string = '';


  ngOnInit() {
  }
  constructor(private http: HttpClient,private router: Router,private dialog: MatDialog) {}


  
  loginUser() {
   
    
    const credentials = {
      username: this.username,
      password: this.password
      
    };
    console.log('Username:', this.username);
    
   

    this.http.post<any>('https://albecoservice.com/albecoproject/userapi/login/', credentials, ).subscribe(
    // this.http.post<any>('http://127.0.0.1:8000/login/', credentials, ).subscribe(
      (response) => {
        const userGroups = response.user.groups;
        const username = response.user.username; // Extract username from response

        if (userGroups.includes('employee_group')) {
          // this.router.navigate(['/home']);
          this.openManagerAccessDeniedPopup(); 
        } else if (userGroups.includes('manager_group')) {
          this.router.navigate(['/dashboard']);
        }
        console.log('Login successful:', response);
        // Perform further actions upon successful login
      },
      
      (error) => {
        console.error('Login failed:', error);
        this.openLoginFailurePopup();
        // Handle login error
      }
    );
  }

  openLoginFailurePopup() {
    this.dialog.open(LoginFailureDialogComponent, {
      width: '300px', // Set the width as needed
      data: { message: 'Login failed. Please check your credentials.' }, // Pass any data needed for the popup
    });
  }
  
  openManagerAccessDeniedPopup() {
    this.dialog.open(ManagerAccessDeniedDialogComponent, {
      width: '300px', // Set the width as needed
      data: { message: 'Only managers can access this page.' }, // Pass any data needed for the popup
    });
  }
}
