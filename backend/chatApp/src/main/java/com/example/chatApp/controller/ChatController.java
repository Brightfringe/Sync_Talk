package com.example.chatApp.controller;

import com.example.chatApp.model.ChatMessage;
import com.example.chatApp.model.UserTracker;
import com.example.chatApp.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Set;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserTracker userTracker;

    @Autowired
    private MessageService messageService;  

    @MessageMapping("/sendMessage")
    @SendTo("/topic/message")
    public ChatMessage sendMessage(ChatMessage message) {
        messageService.save(message);  
        return message;
    }

    @MessageMapping("/join")
    public void join(ChatMessage message) {
        userTracker.addUser(message.getSender());
        message.setType(ChatMessage.MessageType.JOIN);
        messageService.save(message);  
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

    @CrossOrigin(origins = {"http://localhost:8081", "https://sync-talk-olive.vercel.app"})
    @GetMapping("/api/messages/history")
    @ResponseBody
    public List<ChatMessage> getHistory() {
        return messageService.getLast50Messages();
    }

    private void broadcastUsers() {
        Set<String> users = userTracker.getOnlineUsers();
        messagingTemplate.convertAndSend("/topic/users", users);
    }
}