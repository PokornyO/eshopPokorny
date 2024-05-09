package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.ItemDtoV1;
import com.example.eshoppokorny.entity.Item;

import java.util.Base64;

public class ItemMapperV1 {
    public static ItemDtoV1 mapToItemDto(Item item) {
        String image = "";
        if(item.getImage() != null) {
            image = Base64.getEncoder().encodeToString(item.getImage());
        }

        return new ItemDtoV1(item.getId(), item.getPrice(), item.getName(), item.getInStockCount(), item.getDescription(), image);
    }
}
