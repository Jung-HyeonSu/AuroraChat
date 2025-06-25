package com.aurorachat.backend.controller;

import com.aurorachat.backend.model.ChatRoom;
import com.aurorachat.backend.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping("/room")
    public ChatRoom createRoom(@RequestParam String name) {
        return chatRoomService.createRoom(name);
    }

    @GetMapping("/rooms")
    public ArrayList<Object> findAllRoom() {
        return chatRoomService.findAllRoom();
    }

    @GetMapping("/room/{roomId}")
    public ChatRoom findRoomById(@PathVariable String roomId) {
        return chatRoomService.findRoomById(roomId);
    }
}