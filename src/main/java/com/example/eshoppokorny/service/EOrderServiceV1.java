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
import org.springframework.stereotype.Service;

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
    public List<EOrder> getAllOrders() {
        return repository.findAll();
    }

    @Override
    public EOrder findOrderById(Long id) throws EOrderException {
        Optional<EOrder> eOrder = repository.findById(id);
        if(eOrder.isEmpty()) {
            throw new EOrderException("Order with id: " + id + " not found");
        }
        return eOrder.get();
    }

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
            Item item = itemService.findItemById(itemCount.getItemId());
            if(item.getInStockCount() < itemCount.getCount()) {
                System.out.println(item.getInStockCount());
                System.out.println(itemCount.getCount());
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
        repository.save(eOrder);
        eOrderItemRepository.saveAll(eOrderItems);
        return eOrder;
    }

    @Override
    public List<EOrder> findByUserId(Long id) throws EOrderException {
        return repository.findByAppUserId(id);
    }

    @Override
    public void deleteOrder(Long id) throws EOrderException {
        repository.delete(findOrderById(id));
    }
}
