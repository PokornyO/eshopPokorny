package com.example.eshoppokorny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressDtoV1 {
    private long id;
    private String city;
    private String street;
    private int houseNumber;
    private int zipcode;
}
