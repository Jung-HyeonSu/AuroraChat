package com.aurorachat.backend.service;

import com.aurorachat.backend.model.User;
import com.aurorachat.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    public User registerUser(String username, String password, String nickname) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("이미 존재하는 사용자명입니다.");
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(username, encodedPassword, nickname);
        return userRepository.save(user);
    }

    // 유저 조회 (예시)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}