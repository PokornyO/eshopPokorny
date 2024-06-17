package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.repository.AppUserRepository;
import com.example.eshoppokorny.repository.ItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
@Service
public class ItemServiceV1 implements ItemService{
    private final ItemRepository repository;

    public ItemServiceV1(ItemRepository repository) {
        this.repository = repository;
    }
    @Transactional
    @Override
    public Page<Item> getAllItems(Pageable pageable, String sortBy, String sortOrder) {
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);
        return repository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
    }
    @Transactional
    @Override
    public Item findItemById(Long id) throws ItemException {
        Optional<Item> item = repository.findById(id);
        if(item.isEmpty()) {
            throw new ItemException("Item with id: " + id + " not found");
        }
        return item.get();
    }

    @Transactional
    @Override
    public Item createItem(InputItemDtoV1 inputItem) {
        byte[] image = null;
        if(inputItem.getImage() != null) {
            image = Base64.getDecoder().decode(inputItem.getImage());
        }
        Item item = new Item(inputItem.getPrice(), inputItem.getName(), inputItem.getInStockCount(), inputItem.getDescription(), image);
        return repository.save(item);
    }
    @Transactional
    @Override
    public Item updateItem(InputItemDtoV1 inputItem, Long id) throws ItemException {
        Item item = findItemById(id);
        item.setName(inputItem.getName());
        item.setPrice(inputItem.getPrice());
        item.setDescription(inputItem.getDescription());
        item.setInStockCount(inputItem.getInStockCount());
        return repository.save(item);
    }
    @Transactional
    @Override
    public void deleteItem(Long id) throws ItemException {
        repository.delete(findItemById(id));
    }

    @Override
    public Long getCount() {
        return repository.count();
    }
}
