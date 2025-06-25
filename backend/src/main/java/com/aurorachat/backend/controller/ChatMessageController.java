package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @MessageMapping("/chat/message")
    public void message(ChatMessageDto message) {
        try {
            String json = objectMapper.writeValueAsString(message);
            redisTemplate.convertAndSend("chatroom." + message.getRoomId(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}