package com.aurorachat.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor  // 기본 생성자 추가
public class ChatMessageDto {
    private String id;
    private String roomId;
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}
