import { User } from "./user.model";

export class Task {
  id?:number;
  title:string;
  description:string;
  dueTime:Date;
  user:User;

  constructor(title: string, description: string, dueTime: Date, user:User) {
    this.title = title;
    this.description = description;
    this.dueTime = dueTime;
    this.user = user;
  }
}
