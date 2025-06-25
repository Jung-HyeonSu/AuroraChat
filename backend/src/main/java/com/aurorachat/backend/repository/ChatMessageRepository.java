package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// 역할: 채팅 메시지 DB 저장/조회 JPA Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomIdOrderBySentAtAsc(String roomId);
}