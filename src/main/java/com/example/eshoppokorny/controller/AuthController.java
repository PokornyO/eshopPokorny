package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.Model.LoginRequest;
import com.example.eshoppokorny.Model.LoginResponse;
import com.example.eshoppokorny.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/auth")
    @RequiredArgsConstructor
    public class AuthController {
        private final AuthService authService;
        @Transactional
        @PostMapping("/login")
        public LoginResponse login(@RequestBody @Validated LoginRequest request) {
            return authService.attemptLogin(request.getUsername(), request.getPassword());
        }
    }

