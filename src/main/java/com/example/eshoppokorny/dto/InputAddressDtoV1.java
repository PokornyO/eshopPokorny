package com.example.eshoppokorny.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InputAddressDtoV1 {
    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String city;

    @NotNull
    @NotEmpty
    @Size(max = 255)
    private String street;

    @Positive(message = "House number must be a positive number")
    private int houseNumber;

    @PositiveOrZero(message = "Zipcode must be a positive number or zero")
    private int zipcode;
}
