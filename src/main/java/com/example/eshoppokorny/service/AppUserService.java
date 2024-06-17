package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.RoleException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    List<AppUser> getActiveUsers(Boolean active);
    List<AppUser> findUsersByRole(String role);

    Page<AppUser> getAllAppUsers(Pageable pageable, String sortBy, String sortOrder);

    AppUser findUserById(Long id) throws AppUserException;
    Optional<AppUser> findUserByUsername(String username);
    AppUser createAppUse(InputAppUserDtoV1 inputUser) throws RoleException;
    AppUser updateAppUser(AppUser appUser);
    Long getCount();
    AppUser updateAppUser(InputAppUserDtoV1 appUser, Long id) throws AppUserException, RoleException;
    void deleteAppUser(Long id) throws AppUserException;
    boolean isUserUnique(String username);
    boolean isEmailUnique(String email);
}
