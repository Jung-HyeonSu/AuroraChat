package com.aurorachat.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatMessageDto {
    private String roomId;
    private String sender;
    private String content;
    private String time;
}