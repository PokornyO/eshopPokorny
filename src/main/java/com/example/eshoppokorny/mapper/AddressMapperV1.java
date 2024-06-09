package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AddressDtoV1;
import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.AppUser;

public class AddressMapperV1 {
    public static AddressDtoV1 mapAddressToAddressDtoV1(Address address) {
        return new AddressDtoV1(address.getId(), address.getCity(), address.getStreet(), address.getNumber(), address.getPostalCode());
    }
}
