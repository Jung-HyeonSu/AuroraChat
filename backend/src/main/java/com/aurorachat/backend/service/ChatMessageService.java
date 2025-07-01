package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatMessageDto;
import com.aurorachat.backend.model.ChatMessage;
import com.aurorachat.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final RedisTemplate<String, ChatMessageDto> redisTemplate;

    private static final String REDIS_CHAT_KEY_PREFIX = "chatroom:";

    public void saveMessageToMongoDB(ChatMessageDto messageDto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .id(messageDto.getId())
                .roomId(messageDto.getRoomId())
                .sender(messageDto.getSender())
                .content(messageDto.getContent())
                .timestamp(messageDto.getTimestamp())
                .build();

        chatMessageRepository.save(chatMessage);
    }

    public void saveMessageToRedis(ChatMessageDto messageDto) {
        String key = REDIS_CHAT_KEY_PREFIX + messageDto.getRoomId();
        redisTemplate.opsForList().rightPush(key, messageDto);
        redisTemplate.opsForList().trim(key, 0, 99);
        redisTemplate.expire(key, Duration.ofDays(7));  // 7일 유지
    }

    public List<ChatMessageDto> getMessagesFromRedis(String roomId) {
        String key = REDIS_CHAT_KEY_PREFIX + roomId;
        Long size = redisTemplate.opsForList().size(key);
        if (size == null || size == 0) {
            return List.of();
        }
        return redisTemplate.opsForList().range(key, 0, size - 1);
    }

    public List<ChatMessageDto> getMessagesFromMongoDBBefore(String roomId, Instant before) {
        // 'before' 이전 메시지 조회 (7일 이전 메시지)
        List<ChatMessage> messages = chatMessageRepository.findAllByRoomIdAndTimestampBeforeOrderByTimestampAsc(roomId, before);
        return messages.stream()
                .map(msg -> new ChatMessageDto(
                        msg.getId(),
                        msg.getRoomId(),
                        msg.getSender(),
                        msg.getContent(),
                        msg.getTimestamp()))
                .toList();
    }

    public List<ChatMessageDto> getAllMessages(String roomId) {
        Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);

        List<ChatMessageDto> recentMessages = getMessagesFromRedis(roomId);
        List<ChatMessageDto> olderMessages = getMessagesFromMongoDBBefore(roomId, oneWeekAgo);

        List<ChatMessageDto> allMessages = new ArrayList<>();
        allMessages.addAll(olderMessages);
        allMessages.addAll(recentMessages);

        return allMessages;
    }
}

