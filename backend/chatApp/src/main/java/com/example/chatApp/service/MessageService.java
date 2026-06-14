package com.example.chatApp.service;

import com.example.chatApp.model.ChatMessage;
import com.example.chatApp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public ChatMessage save(ChatMessage message) {
        if (message.getType() == null) {
            message.setType(ChatMessage.MessageType.CHAT);
        }
        message.setSentAt(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<ChatMessage> getLast50Messages() {
        return messageRepository.findTop50ByOrderBySentAtAsc();
    }
}