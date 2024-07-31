import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/tasks';
  constructor(private http: HttpClient) { }

  addTask(task:Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }

  getTasksForUser(username:string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}/${username}`);
  }
}
