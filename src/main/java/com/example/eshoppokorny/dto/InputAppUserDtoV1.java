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
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String lastName;
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String username;
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String email;
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String password;
    private Long roleId;
    private boolean active;
}
