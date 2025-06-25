package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatMessageDto;
import com.aurorachat.backend.model.ChatMessage;
import com.aurorachat.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
// 역할: 메시지 저장(MySQL), Redis pub/sub 발행
public class ChatService {
    private final ChatMessageRepository messageRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public void handleMessage(ChatMessageDto dto) {
        // DTO -> Entity 변환 및 저장
        ChatMessage message = ChatMessage.fromDto(dto);
        messageRepository.save(message);
        // Redis 채널에 메시지 발행
        redisTemplate.convertAndSend("chatroom:" + message.getRoomId(), dto);
    }
}