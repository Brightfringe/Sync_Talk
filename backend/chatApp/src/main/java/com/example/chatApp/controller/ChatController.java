package com.example.chatApp.controller;

import com.example.chatApp.model.ChatMessage;
import com.example.chatApp.model.UserTracker;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserTracker userTracker;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/message")
    public ChatMessage sendMessage(ChatMessage message) {
        return message;
    }

    @MessageMapping("/join")
    public void join(ChatMessage message) {
        userTracker.addUser(message.getSender());
        message.setType(ChatMessage.MessageType.JOIN);
        messagingTemplate.convertAndSend("/topic/message", message);
        broadcastUsers();
    }

    @MessageMapping("/leave")
    public void leave(ChatMessage message) {
        userTracker.removeUser(message.getSender());
        message.setType(ChatMessage.MessageType.LEAVE);
        messagingTemplate.convertAndSend("/topic/message", message);
        broadcastUsers();
    }

    private void broadcastUsers() {
        Set<String> users = userTracker.getOnlineUsers();
        messagingTemplate.convertAndSend("/topic/users", users);
    }
}