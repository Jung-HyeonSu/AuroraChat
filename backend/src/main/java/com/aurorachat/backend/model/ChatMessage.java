package com.aurorachat.backend.model;

import com.aurorachat.backend.dto.ChatMessageDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
// 역할: 채팅 메시지 JPA Entity 및 DTO 변환 메서드
public class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;
    private String sender;
    private String content;
    private LocalDateTime sentAt;

    public static ChatMessage fromDto(ChatMessageDto dto) {
        return ChatMessage.builder()
                .roomId(dto.getRoomId())
                .sender(dto.getSender())
                .content(dto.getContent())
                .sentAt(LocalDateTime.now())
                .build();
    }
}