import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { SignupInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf, FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  signupInfo?: SignupInfo;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.signupInfo = new SignupInfo(this.form.username, this.form.password);

    this.authService.signUp(this.signupInfo).subscribe({
      next:(data) =>
      {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error:(error) =>
      {
        console.error('Signup failed:', error);
        this.isSignUpFailed = true;
      }
    });

  }
}
