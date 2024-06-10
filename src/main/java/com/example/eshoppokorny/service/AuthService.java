package com.example.eshoppokorny.service;

import com.example.eshoppokorny.Model.LoginResponse;

public interface AuthService {
    public LoginResponse attemptLogin(String username, String password);
    public boolean hasId(Long id);
}
