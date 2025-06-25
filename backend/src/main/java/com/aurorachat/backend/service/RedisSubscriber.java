package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String body = new String(message.getBody());
            ChatMessageDto chatMessage = objectMapper.readValue(body, ChatMessageDto.class);
            String destination = "/sub/chat/room." + chatMessage.getRoomId();
            messagingTemplate.convertAndSend(destination, chatMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}