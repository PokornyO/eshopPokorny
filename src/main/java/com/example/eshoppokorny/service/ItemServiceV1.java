package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.repository.AppUserRepository;
import com.example.eshoppokorny.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ItemServiceV1 implements ItemService{
    private final ItemRepository repository;

    public ItemServiceV1(ItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public Item findItemById(Long id) throws ItemException {
        Optional<Item> item = repository.findById(id);
        if(item.isEmpty()) {
            throw new ItemException("Item with id: " + id + " not found");
        }
        return item.get();
    }

    @Override
    public Item createItem(InputItemDtoV1 inputItem) {
        Item item = new Item(inputItem.getPrice(), inputItem.getName(), inputItem.getInStockCount(), inputItem.getDescription());
        return repository.save(item);
    }

    @Override
    public Item updateItem(InputItemDtoV1 inputItem, Long id) throws ItemException {
        Item item = findItemById(id);
        item.setName(inputItem.getName());
        item.setPrice(inputItem.getPrice());
        item.setDescription(inputItem.getDescription());
        item.setInStockCount(inputItem.getInStockCount());
        return repository.save(item);
    }

    @Override
    public void deleteItem(Long id) throws ItemException {
        repository.delete(findItemById(id));
    }
}
