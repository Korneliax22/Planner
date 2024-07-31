package com.example.planner.controllers;

import com.example.planner.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public ChatMessage sendMessage(final ChatMessage chatMessage) {
        return chatMessage;
    }
}
