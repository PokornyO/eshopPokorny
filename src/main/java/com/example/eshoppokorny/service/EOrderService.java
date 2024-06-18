package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.EOrderException;
import com.example.eshoppokorny.exceptions.ItemException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EOrderService {
    Page<EOrder> getAllOrders(Pageable pageable, String sortBy, String sortOrder);
    EOrder findOrderById(Long id) throws EOrderException;
    EOrder createOrder(InputEOrderDtoV1 inputEOrderDtoV1) throws AppUserException, AddressException, ItemException;
    Page<EOrder> findByUserId(Long id, Pageable pageable, String sortBy, String sortOrder) throws EOrderException;
    void deleteOrder(Long id) throws EOrderException;
    Long getCount();
    Integer getCountById(long id);
}
