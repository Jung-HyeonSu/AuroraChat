package com.aurorachat.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chat_room")  // 테이블명 지정
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom implements Serializable {

    @Id
    @Column(name = "room_id")
    private String roomId;

    @Column(name = "room_name", nullable = false)
    private String roomName;

    @Column(name = "owner_name", nullable = false)
    private String ownerName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_message")
    private String lastMessage;

    @Column(name = "last_message_time")
    private LocalDateTime lastMessageTime;

    // createdAt 자동 생성 처리
    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now().withSecond(0).withNano(0);
        }
    }
}
