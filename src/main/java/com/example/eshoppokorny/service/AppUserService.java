package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    List<AppUser> getActiveUsers(Boolean active);
    List<AppUser> findUsersByRole(String role);
    List<AppUser> getAllAppUsers();
    AppUser findUserById(Long id) throws AppUserException;
    Optional<AppUser> findUserByUsername(String username);
    AppUser createAppUse(InputAppUserDtoV1 inputUser);
    AppUser updateAppUser(InputAppUserDtoV1 appUser, Long id) throws AppUserException;
    void deleteAppUser(Long id) throws AppUserException;
    boolean isUserUnique(String username);
    boolean isEmailUnique(String email);
}
