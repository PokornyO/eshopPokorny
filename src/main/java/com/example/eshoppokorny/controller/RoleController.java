package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.EOrderDtoV1;
import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.dto.RoleDtoV1;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.mapper.EOrderMapper;
import com.example.eshoppokorny.mapper.RoleMapperV1;
import com.example.eshoppokorny.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/roles")
@AllArgsConstructor
public class RoleController {
    private final RoleService service;
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<List<RoleDtoV1>> getRoles()  {
        List<Role> roles = service.getAllRole();
        List<RoleDtoV1> rolesDto = new ArrayList<>();
        for(Role role: roles) {
            rolesDto.add(RoleMapperV1.mapRoleToRoleDtoV1(role));
        }
        return new ResponseEntity<>(rolesDto, HttpStatus.OK);
    }
}
