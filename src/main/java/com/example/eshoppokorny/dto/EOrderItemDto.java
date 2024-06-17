package com.example.eshoppokorny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EOrderItemDto {
    private String name;
    private int count;
}
