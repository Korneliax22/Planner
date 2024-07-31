import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { TasksComponent } from './tasks/tasks.component';
import { EventsComponent } from './events/events.component';
import { MyPageComponent } from './my-page/my-page.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'events', component: EventsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'mypage', component: MyPageComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
