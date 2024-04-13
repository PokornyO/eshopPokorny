package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.mapper.AppUserMapperV1;
import com.example.eshoppokorny.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppUserController {
    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping("/app-user/active")
    public List<AppUser> getActiveUsers() {
        List<AppUser> users = service.getActiveUsers(true);
        return service.getActiveUsers(true);
    }
    @GetMapping("/app-user/role/{role}")
    public List<AppUser> getProductById(@PathVariable String role) {
        return service.findUsersByRole(role);
    }
    @GetMapping("/app-user/{id}")
    public ResponseEntity<AppUserDtoV1> getUserById(@PathVariable Long id) throws AppUserException {
        return ResponseEntity.ok(AppUserMapperV1.mapAppUserToAppUserDto(service.findUserById(id)));
    }
    @PostMapping("app-user")
    public ResponseEntity<AppUserDtoV1> createUser(@Valid @RequestBody InputAppUserDtoV1 inputUser) {
        return new ResponseEntity<>(AppUserMapperV1.mapAppUserToAppUserDto(service.createAppUse(inputUser)), HttpStatus.CREATED);
    }
    @PutMapping("app-user/{id}")
    public ResponseEntity<AppUserDtoV1> updateUser(@Valid @RequestBody InputAppUserDtoV1 inputUser, @PathVariable Long id) throws AppUserException {
        return new ResponseEntity<>(AppUserMapperV1.mapAppUserToAppUserDto(service.updateAppUser(inputUser, id)), HttpStatus.OK);
    }
    @DeleteMapping("app-user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws AppUserException {
        service.deleteAppUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
