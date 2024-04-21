package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.ItemDtoV1;
import com.example.eshoppokorny.entity.Item;

public class ItemMapperV1 {
    public static ItemDtoV1 mapToItemDto(Item item) {
        return new ItemDtoV1(item.getId(), item.getPrice(), item.getName(), item.getInStockCount(), item.getDescription());
    }
}
