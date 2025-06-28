package com.aurorachat.backend.service;

import com.aurorachat.backend.dto.ChatRoomMemberDto;
import com.aurorachat.backend.model.ChatRoom;
import com.aurorachat.backend.model.ChatRoomMember;
import com.aurorachat.backend.model.User;
import com.aurorachat.backend.repository.ChatRoomMemberRepository;
import com.aurorachat.backend.repository.ChatRoomRepository;
import com.aurorachat.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatRoomMemberService {

    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatRoomMemberService(ChatRoomMemberRepository chatRoomMemberRepository,
                                 ChatRoomRepository chatRoomRepository,
                                 UserRepository userRepository) {
        this.chatRoomMemberRepository = chatRoomMemberRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    public void addMemberToRoom(ChatRoomMemberDto chatRoomMemberDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomMemberDto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));
        User user = userRepository.findByNickname(chatRoomMemberDto.getNickname())
                .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

        ChatRoomMember member = new ChatRoomMember();
        member.setChatRoom(chatRoom);
        member.setUser(user);
        member.setJoinedAt(LocalDateTime.now());
        member.setRole(chatRoomMemberDto.getRole());

        chatRoomMemberRepository.save(member);
    }


}
