package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, String> {
}
