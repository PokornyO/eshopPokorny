package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.RoleException;
import com.example.eshoppokorny.mapper.AppUserMapperV1;
import com.example.eshoppokorny.service.AppUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class AppUserController {
    private final AppUserService service;
    private final PasswordEncoder encoder;


    @GetMapping("/app-user/active")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<AppUser> getActiveUsers() {
        List<AppUser> users = service.getActiveUsers(true);
        return service.getActiveUsers(true);
    }
    @GetMapping("/app-user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<AppUserDtoV1>> getAppUsers(Pageable pageable,
                                                          @RequestParam(required = false) String sortBy,
                                                          @RequestParam(required = false) String sortOrder) {
        Page<AppUser> appUsers = service.getAllAppUsers(pageable, sortBy, sortOrder);
        List<AppUserDtoV1> appUsersDtoV1 = new ArrayList<>();
        for(AppUser user: appUsers) {
            appUsersDtoV1.add(AppUserMapperV1.mapAppUserToAppUserDto(user));
        }
        return ResponseEntity.ok(appUsersDtoV1);
    }
    @GetMapping("/app-user/role/{role}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<AppUser> getUserByID(@PathVariable String role) {
        return service.findUsersByRole(role);
    }
    @GetMapping("/app-user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceV1.hasId(#id)")
    public ResponseEntity<AppUserDtoV1> getUserById(@PathVariable Long id) throws AppUserException {
        return ResponseEntity.ok(AppUserMapperV1.mapAppUserToAppUserDto(service.findUserById(id)));
    }
    @PostMapping("app-user")
    public ResponseEntity<AppUserDtoV1> createUser(@Valid @RequestBody InputAppUserDtoV1 inputUser) throws RoleException {
        String encodedPassword = encoder.encode(inputUser.getPassword());
        inputUser.setPassword(encodedPassword);
        return new ResponseEntity<>(AppUserMapperV1.mapAppUserToAppUserDto(service.createAppUse(inputUser)), HttpStatus.CREATED);
    }
    @PutMapping("app-user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceV1.hasId(#id)")
    public ResponseEntity<AppUserDtoV1> updateUser(@Valid @RequestBody InputAppUserDtoV1 inputUser, @PathVariable Long id) throws AppUserException, RoleException {
        String encodedPassword = encoder.encode(inputUser.getPassword());
        inputUser.setPassword(encodedPassword);
        return new ResponseEntity<>(AppUserMapperV1.mapAppUserToAppUserDto(service.updateAppUser(inputUser, id)), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("app-user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws AppUserException {
        service.deleteAppUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("app-user/count")
    public ResponseEntity<Long> getCount() {
        Long count = service.getCount();
        return ResponseEntity.ok(count);
    }
    @GetMapping("app-user/email")
    public ResponseEntity<Boolean> isEmailUnique(@RequestParam String email) {
        boolean isUnique = service.isEmailUnique(email);
        return ResponseEntity.ok(isUnique);
    }

    @GetMapping("app-user/username")
    public ResponseEntity<Boolean> isUsernameUnique(@RequestParam String username) {
        boolean isUnique = service.isUserUnique(username);
        return ResponseEntity.ok(isUnique);
    }
}
