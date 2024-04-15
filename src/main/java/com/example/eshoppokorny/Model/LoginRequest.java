package com.example.eshoppokorny.Model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginRequest {
    private final String username;
    private final String password;
}
