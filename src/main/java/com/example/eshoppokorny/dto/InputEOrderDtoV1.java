package com.example.eshoppokorny.dto;

import lombok.Data;

import java.util.List;
@Data
public class InputEOrderDtoV1 {
    private Long userId;
    private Long addressId;
    private List<ItemCount> productInfo;
    private double totalPrice;
}
