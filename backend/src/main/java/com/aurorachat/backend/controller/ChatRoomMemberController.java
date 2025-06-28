package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.ChatRoomMemberDto;
import com.aurorachat.backend.service.ChatRoomMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat-room-members")
public class ChatRoomMemberController {

    private final ChatRoomMemberService chatRoomMemberService;

    public ChatRoomMemberController(ChatRoomMemberService chatRoomMemberService) {
        this.chatRoomMemberService = chatRoomMemberService;
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinRoom(@RequestBody ChatRoomMemberDto chatRoomMemberDto) {
        chatRoomMemberService.addMemberToRoom(chatRoomMemberDto);
        return ResponseEntity.ok("채팅방에 참여했습니다.");
    }
}
