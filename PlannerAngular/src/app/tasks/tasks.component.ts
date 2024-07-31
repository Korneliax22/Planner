import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../model/task.model';
import { TaskService } from '../service/task.service';
import { UserService } from '../service/user.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  errorMessage: string = '';
  tasksList?: Task[];

  constructor(private taskService:TaskService, private userService:UserService, private tokenStorageService:TokenStorageService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    const username = this.tokenStorageService.getUsername();
    this.taskService.getTasksForUser(username)
      .subscribe(
        tasksList =>  {
          this.tasksList = tasksList;
        },
        error => {
          console.log('Error fetching tasks:', error);
        });
  }

  add(title: string, description: string, dueTime: string) {
    const username = this.tokenStorageService.getUsername();
    console.log('Username: ', username);
    this.userService.findUser(username).subscribe({
      next: user => {
        const newTask = new Task(title, description, new Date(dueTime), user);
        this.taskService.addTask(newTask).subscribe({
          next: (task :Task) => {
            this.errorMessage = 'Task added successfully';
            this.tasksList?.push(task);
          },
          error: () => {
            this.errorMessage = 'Error adding task';
          }
        });
      },
      error: () => {
        console.error('Error fetching user');
      }
    });
  }

}
