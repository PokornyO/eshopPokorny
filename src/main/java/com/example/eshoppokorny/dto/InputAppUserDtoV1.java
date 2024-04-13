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
    private String username;
    private String password;
    private boolean active;
}
