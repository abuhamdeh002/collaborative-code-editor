package com.example.collaborativeeditor.controller;

import com.example.collaborativeeditor.WebSocket.CodeMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class CodeController {

    @MessageMapping("/edit")
    @SendTo("/topic/code")
    public CodeMessage edit(CodeMessage message) {
        message.setTimestamp(getCurrentTimestamp());
        System.out.println("Received edit from user: " + message.getUser());
        System.out.println("Content: " + message.getContent());
        return message; // Broadcast to other clients
    }

    private String getCurrentTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }
}
