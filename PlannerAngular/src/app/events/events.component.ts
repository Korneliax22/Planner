import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../service/events.service';
import { TokenStorageService } from '../auth/token-storage.service';
import {Event} from '../model/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  isLoggedIn:boolean = false;

  constructor(private eventsService:EventsService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.tokenStorage.checkForTokenGoogle();
    if (this.tokenStorage.getTokenGoogle() != '') {
      this.getEvents();
    }
  }

  loginToGoogleCalendar() {
    window.location.href = 'http://localhost:8080/calendar';
  }

  getEvents() {
    const token = this.eventsService.getTokenGoogle();

    if (token) {
      this.isLoggedIn = true;
      this.eventsService.getEvents(token)
        .subscribe(
          events => {
            this.events = events;
          },
          error => {
            console.error('Error fetching events:', error);
          });
    }
    else
    {
      console.error('No token found');
    }

  }
  
}
