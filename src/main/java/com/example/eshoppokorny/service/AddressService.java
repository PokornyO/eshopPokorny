package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.dto.InputItemDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.ItemException;

import java.util.List;

public interface AddressService {
    List<Address> getAllAddresses();
    Address findAddressById(Long id) throws AddressException;
    Address creatAddress(InputAddressDtoV1 inputAddress);
    Address updateAddress(InputAddressDtoV1 inputAddress, Long id) throws AddressException;
    void deleteAddress(Long id) throws AddressException;
}
