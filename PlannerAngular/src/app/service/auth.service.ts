import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtResponse } from '../auth/jwt-response';
import { SignupInfo } from '../auth/signup-info';
import { LoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private signupUrl = 'http://localhost:8080/auth/signup';

  constructor(private http: HttpClient) { }

  login(info: LoginInfo) {
    return this.http.post<JwtResponse>(this.loginUrl, info);
  }

  signUp(info: SignupInfo) {
    return this.http.post<string>(this.signupUrl, info);
  }

}
