import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }

  saveToken(token: string) {

    localStorage.setItem(
      'travlr-token',
      token
    );

  }

  getToken() {

    return localStorage.getItem(
      'travlr-token'
    );

  }

  logout() {

    localStorage.removeItem(
      'travlr-token'
    );

  }

  isLoggedIn() {

    return !!this.getToken();

  }

}
