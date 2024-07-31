export interface Event {
  summary: string;
  description?: string;
  location?: string;
  start: EventDateTime;
}

export interface EventDateTime {
  dateTime:string;
  timeZone:string;
}

