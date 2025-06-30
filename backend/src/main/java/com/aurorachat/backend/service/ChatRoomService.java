package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatRoomMemberDto;
import com.aurorachat.backend.model.ChatRoom;
import com.aurorachat.backend.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberService chatRoomMemberService; // ChatRoomMemberService 주입

    private static final String CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom random = new SecureRandom();

    private String generateRoomId() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            int idx = random.nextInt(CHAR_POOL.length());
            sb.append(CHAR_POOL.charAt(idx));
        }
        return sb.toString();
    }

    public ChatRoom createRoom(String roomName, String ownerName) {
        String roomId;
        do {
            roomId = generateRoomId();
        } while (chatRoomRepository.existsByRoomId(roomId));

        ChatRoom chatRoom = new ChatRoom(roomId, roomName, ownerName, LocalDateTime.now(), "", LocalDateTime.now());
        chatRoomRepository.save(chatRoom);

        ChatRoomMemberDto ownerMemberDto = new ChatRoomMemberDto(null,
                roomId,
                ownerName,
                LocalDateTime.now(),
                "admin");
        chatRoomMemberService.addMemberToRoom(ownerMemberDto);

        return chatRoom;
    }

    public List<ChatRoom> findAllRoom() {
        return chatRoomRepository.findAll();
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRoomRepository.findById(roomId).orElse(null);
    }
}
