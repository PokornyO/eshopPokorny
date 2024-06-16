package com.example.eshoppokorny.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InputAppUserDtoV1 {
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private Long roleId;
    private boolean active;
}
