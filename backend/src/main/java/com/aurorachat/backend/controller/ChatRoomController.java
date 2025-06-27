package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.ChatRoomDto;
import com.aurorachat.backend.dto.RegisterDto;
import com.aurorachat.backend.model.ChatRoom;
import com.aurorachat.backend.model.User;
import com.aurorachat.backend.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping("/room")
    public ResponseEntity<ChatRoomDto> createRoom(@RequestBody ChatRoomDto request) {
        ChatRoom chatRoom = chatRoomService.createRoom(
                request.getRoomName(),
                request.getOwnerName()
        );

        ChatRoomDto response = new ChatRoomDto(
                chatRoom.getRoomId(),
                chatRoom.getRoomName(),
                chatRoom.getOwnerName(),
                chatRoom.getCreatedAt(),
                chatRoom.getLastMessage(),
                chatRoom.getLastMessageTime()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/rooms")
    public List<ChatRoomDto> findAllRoom() {
        List<ChatRoom> rooms = chatRoomService.findAllRoom();
        if (rooms == null) {
            return Collections.emptyList();
        }

        return rooms.stream()
                .map(room -> new ChatRoomDto(
                        room.getRoomId(),
                        room.getRoomName(),
                        room.getOwnerName(),
                        room.getCreatedAt(),
                        room.getLastMessage(),
                        room.getLastMessageTime()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/room/{roomId}")
    public ChatRoom findRoomById(@PathVariable String roomId) {
        return chatRoomService.findRoomById(roomId);
    }
}