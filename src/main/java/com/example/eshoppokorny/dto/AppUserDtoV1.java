package com.example.eshoppokorny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class AppUserDtoV1 {
    private long id;
    private String username;
    private String password;
    private boolean active;
    private Date creation_date;
    private Date update_date;
}
