package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.EOrderDtoV1;
import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.EOrderException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.mapper.EOrderMapper;
import com.example.eshoppokorny.service.EOrderServiceV1;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class EOrderController {
    private final EOrderServiceV1 eOrderServiceV1;
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @Transactional
    @PostMapping("")
    public ResponseEntity<EOrderDtoV1> create(@RequestBody InputEOrderDtoV1 inputEOrderDtoV1) throws ItemException, AddressException, AppUserException {
        return new ResponseEntity<>(EOrderMapper.mapEOrderToEOrderDtoV1(eOrderServiceV1.createOrder(inputEOrderDtoV1)), HttpStatus.CREATED);
    }
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceV1.hasId(#id)")
    @GetMapping("/user/{id}")
    public ResponseEntity<List<EOrderDtoV1>> findByUserId(@PathVariable Long id) throws EOrderException {
        List<EOrder> orders = eOrderServiceV1.findByUserId(id);
        List<EOrderDtoV1> purchaseResponseDto = new ArrayList<>();
        for (EOrder eOrder : orders) {
            purchaseResponseDto.add(EOrderMapper.mapEOrderToEOrderDtoV1(eOrder));
        }
        return ResponseEntity.ok(purchaseResponseDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceV1.hasAccessToOrder(#id)")
    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity<EOrderDtoV1> findById(@PathVariable Long id) throws EOrderException {
        return ResponseEntity.ok(EOrderMapper.mapEOrderToEOrderDtoV1(eOrderServiceV1.findOrderById(id)));
    }
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping()
    public ResponseEntity<List<EOrderDtoV1>> getAllOrders() throws EOrderException {
        List<EOrder> orders = eOrderServiceV1.getAllOrders();
        List<EOrderDtoV1> orderDtoV1s = new ArrayList<>();
        for(EOrder order: orders) {
            orderDtoV1s.add(EOrderMapper.mapEOrderToEOrderDtoV1(order));
        }
        return ResponseEntity.ok(orderDtoV1s);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<EOrderDtoV1> deleteOrder(@PathVariable Long id) throws EOrderException {
        eOrderServiceV1.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

