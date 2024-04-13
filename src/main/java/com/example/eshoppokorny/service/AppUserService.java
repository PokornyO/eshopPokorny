package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;

import java.util.List;

public interface AppUserService {
    List<AppUser> getActiveUsers(Boolean active);
    List<AppUser> findUsersByRole(String role);
    AppUser findUserById(Long id) throws AppUserException;
    AppUser createAppUse(InputAppUserDtoV1 inputUser);
    AppUser updateAppUser(InputAppUserDtoV1 appUser, Long id) throws AppUserException;
    void deleteAppUser(Long id) throws AppUserException;
}
