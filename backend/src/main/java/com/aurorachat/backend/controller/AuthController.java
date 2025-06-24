package com.aurorachat.backend.controller;

import com.aurorachat.backend.dto.LoginDto;
import com.aurorachat.backend.model.User;
import com.aurorachat.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        // 유저 인증 후 User 반환
        Optional<User> userOpt = authService.authenticateAndGetUser(loginDto.getUsername(), loginDto.getPassword());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = authService.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("nickname", user.getNickname());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return ResponseEntity.status(401).body(error);
        }
    }
}