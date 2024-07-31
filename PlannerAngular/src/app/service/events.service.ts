import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { Event } from '../model/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsUrl = 'http://localhost:8080/events';
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getTokenGoogle() {
    return this.tokenService.getTokenGoogle();
  }

  getEvents(token:string): Observable<Event[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Event[]>(this.eventsUrl, { headers });
  }

}

