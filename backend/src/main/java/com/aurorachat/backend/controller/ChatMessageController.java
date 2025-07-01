package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.ChatMessageDto;
import com.aurorachat.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat/messages")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @GetMapping("/{roomId}")
    public ResponseEntity<List<ChatMessageDto>> getMessages(@PathVariable String roomId) {
        try {
            // 전체 메시지 조회 (7일 이전은 몽고, 이후는 레디스)
            List<ChatMessageDto> messages = chatMessageService.getAllMessages(roomId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
