package com.example.chatApp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;       

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)  
    private MessageType type;

    private LocalDateTime sentAt;

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}