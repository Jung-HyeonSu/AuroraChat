package com.aurorachat.backend.service;

import com.aurorachat.backend.model.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private static final String CHAT_ROOMS_KEY = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;

    public ChatRoom createRoom(String name) {
        String roomId = UUID.randomUUID().toString();
        ChatRoom room = new ChatRoom(roomId, name);
        redisTemplate.opsForHash().put(CHAT_ROOMS_KEY, roomId, room);
        return room;
    }
    public ArrayList<Object> findAllRoom() {
        return new ArrayList<>(redisTemplate.opsForHash().values(CHAT_ROOMS_KEY));
    }
    public ChatRoom findRoomById(String roomId) {
        return (ChatRoom) redisTemplate.opsForHash().get(CHAT_ROOMS_KEY, roomId);
    }
}