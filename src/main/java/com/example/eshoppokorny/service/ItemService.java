package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.ItemException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService {
    Page<Item> getAllItems(Pageable pageable, String sortBy, String sortOrder);
    Item findItemById(Long id) throws ItemException;
    Item createItem(InputItemDtoV1 inputItem);
    Item updateItem(InputItemDtoV1 inputItem, Long id) throws ItemException;
    void deleteItem(Long id) throws ItemException;
    Long getCount();
}
