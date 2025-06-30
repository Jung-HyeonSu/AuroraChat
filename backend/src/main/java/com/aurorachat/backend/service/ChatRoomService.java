package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatRoomMemberDto;
import com.aurorachat.backend.model.ChatRoom;
import com.aurorachat.backend.model.ChatRoomMember;
import com.aurorachat.backend.model.User;
import com.aurorachat.backend.repository.ChatRoomMemberRepository;
import com.aurorachat.backend.repository.ChatRoomRepository;
import com.aurorachat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberService chatRoomMemberService;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final UserRepository userRepository;

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

    // 채팅방 생성 + 생성자(admin) 자동 가입
    public ChatRoom createRoom(String roomName, String ownerName) {
        String roomId;
        do {
            roomId = generateRoomId();
        } while (chatRoomRepository.existsByRoomId(roomId));

        ChatRoom chatRoom = new ChatRoom(roomId, roomName, ownerName, LocalDateTime.now(), "", LocalDateTime.now());
        chatRoomRepository.save(chatRoom);

        ChatRoomMemberDto ownerMemberDto = new ChatRoomMemberDto(
                null,
                roomId,
                ownerName,
                LocalDateTime.now(),
                "admin"
        );
        chatRoomMemberService.addMemberToRoom(ownerMemberDto);

        return chatRoom;
    }

    // 모든 채팅방 조회 (필요시 사용)
    public List<ChatRoom> findAllRoom() {
        return chatRoomRepository.findAll();
    }

    // 닉네임으로 가입된 채팅방만 조회
    public List<ChatRoom> findRoomsByUser(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if (user.isEmpty()) {
            return List.of();
        }

        List<ChatRoomMember> members = chatRoomMemberRepository.findByUser(user);
        return members.stream()
                .map(ChatRoomMember::getChatRoom)
                .distinct()
                .collect(Collectors.toList());
    }

    // 특정 방 조회
    public ChatRoom findRoomById(String roomId) {
        return chatRoomRepository.findById(roomId).orElse(null);
    }
}
