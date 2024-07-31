import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.css'
})
export class MyPageComponent implements OnInit{
  username:string = '';

  constructor(private router:Router, private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
        this.router.navigate(['/login']);
      }
    this.username = this.tokenStorage.getUsername();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.href = '/login';
  }

}
