package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.ChatRoomMember;
import com.aurorachat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, String> {
    List<ChatRoomMember> findByUser(Optional<User> user);
}
