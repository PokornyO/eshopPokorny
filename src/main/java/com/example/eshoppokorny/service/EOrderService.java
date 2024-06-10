package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.EOrderException;
import com.example.eshoppokorny.exceptions.ItemException;

import java.util.List;

public interface EOrderService {
    List<EOrder> getAllOrders();
    EOrder findOrderById(Long id) throws EOrderException;
    EOrder createOrder(InputEOrderDtoV1 inputEOrderDtoV1) throws AppUserException, AddressException, ItemException;
    List<EOrder> findByUserId(Long id) throws EOrderException;
    void deleteOrder(Long id) throws EOrderException;
}
