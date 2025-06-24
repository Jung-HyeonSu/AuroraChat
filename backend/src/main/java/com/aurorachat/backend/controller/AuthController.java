package com.aurorachat.backend.controller;


import com.aurorachat.backend.model.LoginDto;
import com.aurorachat.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        boolean result = authService.authenticate(loginDto.getUsername(), loginDto.getPassword());
        if (result) {
            return ResponseEntity.ok().body("로그인 성공");
        } else {
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }
}