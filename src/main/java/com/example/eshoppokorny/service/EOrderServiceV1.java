package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.dto.ItemCount;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.entity.EOrderItem;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.EOrderException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.repository.EOrderItemRepository;
import com.example.eshoppokorny.repository.EOrderRepository;
import com.example.eshoppokorny.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EOrderServiceV1 implements EOrderService{
    private final EOrderRepository repository;
    private final EOrderItemRepository eOrderItemRepository;
    private final AppUserService appUserService;
    private final AddressService addressService;
    private final ItemService itemService;
    private final ItemRepository itemRepository;

    @Override
    public Page<EOrder> getAllOrders(Pageable pageable, String sortBy, String sortOrder) {
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);
        return repository.findAllEOrders(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
    }
    @Transactional
    @Override
    public EOrder findOrderById(Long id) throws EOrderException {
        Optional<EOrder> eOrder = repository.findById(id);
        if(eOrder.isEmpty()) {
            throw new EOrderException("Order with id: " + id + " not found");
        }
        return eOrder.get();
    }
    @Transactional
    @Override
    public EOrder createOrder(InputEOrderDtoV1 inputEOrderDtoV1) throws AppUserException, AddressException, ItemException {
        EOrder eOrder = new EOrder();
        eOrder.setCreationDate(new Date());
        eOrder.setAppUser(appUserService.findUserById(inputEOrderDtoV1.getUserId()));
        eOrder.setAddress(addressService.findAddressById(inputEOrderDtoV1.getAddressId()));
        List<EOrderItem> eOrderItems = new ArrayList<>();
        double price = 0;
        for(ItemCount itemCount : inputEOrderDtoV1.getProductInfo()) {
            EOrderItem eOrderItem = new EOrderItem();
            System.out.println(itemCount.getCount());
            System.out.println("id:" + itemCount.getItemId());
            Item item = itemService.findItemById(itemCount.getItemId());
            System.out.println(item.getId());
            if(item.getInStockCount() < itemCount.getCount()) {
                throw new ItemException("More items than in stock");
            } else {
                item.setInStockCount(item.getInStockCount()- itemCount.getCount());
                itemRepository.save(item);
            }
            price += item.getPrice()*itemCount.getCount();
            eOrderItem.setItem(item);
            eOrderItem.setCount(itemCount.getCount());
            eOrderItem.setOrder(eOrder);
            eOrderItems.add(eOrderItem);
        }
        eOrder.setPrice(price);
        eOrder.setOrderItems(eOrderItems);
        repository.save(eOrder);
        eOrderItemRepository.saveAll(eOrderItems);
        System.out.println(eOrder.getOrderItems().size());
        return eOrder;
    }
    @Transactional
    @Override
    public Page<EOrder> findByUserId(Long id, Pageable pageable, String sortBy, String sortOrder) throws EOrderException {
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);
        return repository.findEOrderByAppUserId(id, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
    }
    @Transactional
    @Override
    public void deleteOrder(Long id) throws EOrderException {
        System.out.println(id);
        repository.delete(findOrderById(id));
    }

    @Override
    public Long getCount() {
        return repository.count();
    }

    @Override
    public Integer getCountById(long id) {
        return repository.findByAppUserId(id).size();
    }
}
