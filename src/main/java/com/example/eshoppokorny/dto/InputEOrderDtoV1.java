package com.example.eshoppokorny.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
@Data
public class InputEOrderDtoV1 {
    @NotNull
    private Long userId;
    @NotNull
    private Long addressId;
    private List<ItemCount> productInfo;
}
