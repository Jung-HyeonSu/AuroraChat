package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByRoomIdAndTimestampBeforeOrderByTimestampAsc(String roomId, Instant before);
}

