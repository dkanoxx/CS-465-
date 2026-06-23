import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = 'admin@travlr.com';
  password = 'password123';
  message = '';

  constructor(private auth: AuthenticationService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.saveToken(response.token);
        this.message = 'Login successful';
        window.location.reload();
      },
      error: () => {
        this.message = 'Invalid login';
      }
    });
  }
}
