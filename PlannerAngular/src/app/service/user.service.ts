import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users';
  constructor(private http:HttpClient) { }

  findUser(username:string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${username}`);
  }
}
