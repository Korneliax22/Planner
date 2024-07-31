import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const TOKEN_KEY_GOOGLE = 'GoogleAuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  saveToken(token:string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY) || '';
  }

  saveTokenGoogle(token: string) {
    sessionStorage.setItem(TOKEN_KEY_GOOGLE, token);
  }

  getTokenGoogle(): string {
    return sessionStorage.getItem(TOKEN_KEY_GOOGLE) || '';
  }

  checkForTokenGoogle() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get(this.getConstTokenGoogle());
    if (token) {
      this.saveTokenGoogle(token);
    }
  }

  getConstTokenGoogle() {
    return TOKEN_KEY_GOOGLE;
  }
  
}
