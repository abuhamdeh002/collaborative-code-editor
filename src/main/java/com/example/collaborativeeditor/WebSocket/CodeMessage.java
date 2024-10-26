package com.example.collaborativeeditor.WebSocket;

public class CodeMessage {
    private String content;
    private String user;
    private String timestamp;
    private String action; // E.g., "EDIT", "SAVE"

    // Constructors
    public CodeMessage() {}

    public CodeMessage(String content, String user, String timestamp, String action) {
        this.content = content;
        this.user = user;
        this.timestamp = timestamp;
        this.action = action;
    }

    // Getters and Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
