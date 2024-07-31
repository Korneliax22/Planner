import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginInfo } from '../auth/login-info';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  private loginInfo?: LoginInfo;
  token?:string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken() != '') {
      this.isLoggedIn = true;
      this.router.navigate(['/mypage']);
    }
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.login(this.loginInfo).subscribe({
      next:(data) =>
      {
        this.tokenStorage.saveToken(data.token || '');
        this.tokenStorage.saveUsername(data.username || '');
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.token = this.tokenStorage.getToken();
        window.location.reload();
      },
      error:(error) =>
      {
        this.isLoginFailed = true;
      }
    });
  }
}
