import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorageService } from './auth/token-storage.service';
import { AuthInterceptor } from './auth/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppComponent implements OnInit{
  title = 'PlannerAngular';
  loggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private router:Router) {  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.loggedIn = true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }

}
