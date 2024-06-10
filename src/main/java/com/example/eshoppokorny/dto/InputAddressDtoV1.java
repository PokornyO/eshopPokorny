package com.example.eshoppokorny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InputAddressDtoV1 {
    private String city;
    private String street;
    private int houseNumber;
    private int zipcode;
}
