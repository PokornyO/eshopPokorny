package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AddressDtoV1;
import com.example.eshoppokorny.entity.Address;

public class AddressMapperV1 {
    public static AddressDtoV1 mapAddressToAddressDtoV1(Address address) {
        return new AddressDtoV1(address.getId(), address.getCity(), address.getStreet(), address.getHouseNumber(), address.getZipcode());
    }
}
