package com.aurorachat.backend.model;

import com.aurorachat.backend.dto.ChatMessageDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
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