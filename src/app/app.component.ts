import { Component } from '@angular/core';
import { routes } from './app-routing.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'laundryAdmin';
  routes = routes;
  currentNavName!: string;
  isLoginPage: boolean = false;
  isLoggedIn: boolean = true; // Set this based on user login status
  username: string = 'John Doe';
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      
      this.isLoginPage = this.route.snapshot.firstChild?.routeConfig?.path === 'login';
    });
  }
  logout() {
    // Perform logout actions here, such as clearing user session, navigating to login page, etc.
  }
}
