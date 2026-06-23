import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripList } from './trip-list/trip-list';
import { TripForm } from './trip-form/trip-form';
import { Login } from './login/login';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Login,
    TripList,
    TripForm
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private auth: AuthenticationService) {}

  loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }

}
