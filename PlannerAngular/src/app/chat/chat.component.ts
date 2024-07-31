import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../service/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../model/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(public chatService: ChatService) { }
  sendMessage(newMessage:string) { }

}
