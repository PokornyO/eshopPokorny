package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.AddressDtoV1;
import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.dto.ItemDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.mapper.AddressMapperV1;
import com.example.eshoppokorny.mapper.ItemMapperV1;
import com.example.eshoppokorny.service.AddressService;
import com.example.eshoppokorny.service.ItemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/address")
@AllArgsConstructor
public class AddressController {
    private AddressService service;
    @GetMapping()
    public ResponseEntity<List<AddressDtoV1>> getAddresses() {
        List<Address> addresses = service.getAllAddresses();
        List<AddressDtoV1> addressDtoV1s = new ArrayList<>();
        for(Address address: addresses) {
            addressDtoV1s.add(AddressMapperV1.mapAddressToAddressDtoV1((address)));
        }
        return ResponseEntity.ok(addressDtoV1s);
    }
    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AddressDtoV1> createAddress(@Valid @RequestBody InputAddressDtoV1 inputAddressDtoV1) {
        return new ResponseEntity<>(AddressMapperV1.mapAddressToAddressDtoV1(service.creatAddress(inputAddressDtoV1)), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<AddressDtoV1> getUserById(@PathVariable Long id) throws AddressException {
        return ResponseEntity.ok(AddressMapperV1.mapAddressToAddressDtoV1(service.findAddressById(id)));
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AddressDtoV1> updateItem(@Valid @RequestBody InputAddressDtoV1 inputAddressDtoV1, @PathVariable Long id) throws AddressException {
        return new ResponseEntity<>(AddressMapperV1.mapAddressToAddressDtoV1(service.updateAddress(inputAddressDtoV1,id)), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws AddressException {
        service.deleteAddress(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
