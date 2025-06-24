package com.aurorachat.backend.repository;

import com.aurorachat.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {
    // 임시 메모리 DB 예시 (실제 환경에서는 JPA, MyBatis 등 사용)
    private final Map<String, User> users = new HashMap<>();

    public UserRepository() {
        // 예시 사용자 (실제 DB에서는 제거)
        users.put("test", new User("test", "1234"));
    }

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }
}