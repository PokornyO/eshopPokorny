package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Role;

public class AppUserMapperV1 {
    public static AppUserDtoV1 mapAppUserToAppUserDto(AppUser user) {
        Long id = null;
        if(user.getAddress() != null) {
            id = user.getAddress().getId();
        }
        Role role = null;
        if(!user.getRoles().isEmpty()) {
            role = user.getRoles().get(0);
        }
        return new AppUserDtoV1(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.isActive(), user.getCreation_date(), user.getUpdate_date(), id, role);
    }

}
