package com.example.eshoppokorny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ItemDtoV1 {
    private long id;
    private double price;
    private String name;
    private int inStockCount;
    private String description;
}
