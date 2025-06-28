package com.aurorachat.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ChatRoomMemberDto {
    private Long id;
    private String roomId;
    private String nickname;
    private LocalDateTime joinedAt;
    private String role;
}
