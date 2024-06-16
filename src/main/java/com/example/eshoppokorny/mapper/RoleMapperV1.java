package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.RoleDtoV1;
import com.example.eshoppokorny.entity.Role;

public class RoleMapperV1 {
    public static RoleDtoV1 mapRoleToRoleDtoV1(Role role) {
        return new RoleDtoV1(role.getId(), role.getName());
    }
}
