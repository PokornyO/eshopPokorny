package com.example.eshoppokorny.controller;

import com.example.eshoppokorny.dto.AddressDtoV1;
import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.dto.ItemDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.mapper.AddressMapperV1;
import com.example.eshoppokorny.mapper.ItemMapperV1;
import com.example.eshoppokorny.repository.AppUserRepository;
import com.example.eshoppokorny.service.AddressService;
import com.example.eshoppokorny.service.AppUserServiceV1;
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
    private AddressService addressService;
    private AppUserServiceV1 userService;
    @GetMapping()
    public ResponseEntity<List<AddressDtoV1>> getAddresses() {
        List<Address> addresses = addressService.getAllAddresses();
        List<AddressDtoV1> addressDtoV1s = new ArrayList<>();
        for(Address address: addresses) {
            addressDtoV1s.add(AddressMapperV1.mapAddressToAddressDtoV1((address)));
        }
        return ResponseEntity.ok(addressDtoV1s);
    }
    @PostMapping("/user/{id}")
    public ResponseEntity<AddressDtoV1> createAddressUser(@Valid @RequestBody InputAddressDtoV1 inputAddressDtoV1, @PathVariable Long id) throws AppUserException {
        Address address;
        if(addressService.exists(inputAddressDtoV1)) {
            address = addressService.findByAllAttributes(inputAddressDtoV1).get(0);
        } else {
            address = addressService.creatAddress(inputAddressDtoV1);
        }
        AppUser appUser= userService.findUserById(id);
        appUser.setAddress(address);
        userService.updateAppUser(appUser);
        return new ResponseEntity<>(AddressMapperV1.mapAddressToAddressDtoV1(address), HttpStatus.CREATED);
    }
    @PostMapping()
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<AddressDtoV1> createAddressOrder(@Valid @RequestBody InputAddressDtoV1 inputAddressDtoV1) throws AppUserException {
        Address address;
        if(addressService.exists(inputAddressDtoV1)) {
            address = addressService.findByAllAttributes(inputAddressDtoV1).get(0);
        } else {
            address = addressService.creatAddress(inputAddressDtoV1);
        }
        return new ResponseEntity<>(AddressMapperV1.mapAddressToAddressDtoV1(address), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<AddressDtoV1> getAddressById(@PathVariable Long id) throws AddressException {
        return ResponseEntity.ok(AddressMapperV1.mapAddressToAddressDtoV1(addressService.findAddressById(id)));
    }

}
