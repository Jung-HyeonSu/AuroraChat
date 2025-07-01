package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.ChatMessageDto;
import com.aurorachat.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    @MessageMapping("/chat/message") // 클라이언트가 보낼 STOMP 경로 (/pub/chat/message)
    public void handleChatMessage(ChatMessageDto messageDto) {
        // 1) 메시지 저장
        chatMessageService.saveMessageToMongoDB(messageDto);
        chatMessageService.saveMessageToRedis(messageDto);

        // 2) 저장된 메시지를 구독자에게 발송
        messagingTemplate.convertAndSend("/sub/chatroom/" + messageDto.getRoomId(), messageDto);
    }
}
