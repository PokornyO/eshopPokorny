package com.example.eshoppokorny.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InputItemDtoV1 {
    private long id;
    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be a positive number")
    private double price;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name can have at most 100 characters")
    private String name;

    @NotNull(message = "In stock count cannot be null")
    @Min(value = 0, message = "In stock count must be zero or more")
    private int inStockCount;

    @Size(max = 255, message = "Description can have at most 500 characters")
    private String description;
    private String image;
}
