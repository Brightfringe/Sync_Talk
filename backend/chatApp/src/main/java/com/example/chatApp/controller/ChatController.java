package com.example.chatApp.controller;

import com.example.chatApp.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    @MessageMapping("/sendMessage")
    @SendTo("/topic/message")
    public ChatMessage sentMessage(ChatMessage message){
        return message;
    }

    @GetMapping("chat")
    public String chat() {
        return "chat";
    }
}
