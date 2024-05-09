package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.ItemException;

import java.util.List;

public interface ItemService {
    List<Item> getAllItems();
    Item findItemById(Long id) throws ItemException;
    Item createItem(InputItemDtoV1 inputItem);
    Item updateItem(InputItemDtoV1 inputItem, Long id) throws ItemException;
    void deleteItem(Long id) throws ItemException;
}
