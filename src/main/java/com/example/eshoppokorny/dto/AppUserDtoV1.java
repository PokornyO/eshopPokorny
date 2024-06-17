package com.example.eshoppokorny.dto;

import com.example.eshoppokorny.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class AppUserDtoV1 {
    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean active;
    private Date creation_date;
    private Date update_date;
    private Long address_id;
    private Role role;
}
