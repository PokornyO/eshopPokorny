package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;

public class AppUserMapperV1 {
    public static AppUserDtoV1 mapAppUserToAppUserDto(AppUser user) {
        return new AppUserDtoV1(user.getId(), user.getUsername(), user.getPassword(), user.isActive(), user.getCreation_date(), user.getUpdate_date());
    }

}
