import { Injectable } from '@angular/core';
import { ChatMessage } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: ChatMessage[] = [];

  constructor() { }

  sendMessage(chatMessage: ChatMessage){ }
  getMessages() { }
  showMessage(chatMessage: ChatMessage) { }

}
