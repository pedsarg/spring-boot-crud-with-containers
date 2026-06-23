package com.pedsarg.witcherapi.shared.exceptions;

import java.time.LocalDateTime;

public class ExceptionResponse {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private String path;
    
    public ExceptionResponse(LocalDateTime timestamp, int status, String error, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = error;
        this.path = path;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String error) {
        this.message = error;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }    
}
