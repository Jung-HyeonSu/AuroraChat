package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    boolean existsByRoomId(String roomId);
}
