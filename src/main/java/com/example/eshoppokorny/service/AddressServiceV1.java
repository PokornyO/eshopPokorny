package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.exceptions.ItemException;
import com.example.eshoppokorny.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceV1 implements AddressService{
    private final AddressRepository repository;
    @Override
    public List<Address> getAllAddresses() {
        return repository.findAll();
    }

    @Override
    public Address findAddressById(Long id) throws AddressException {
        Optional<Address> address = repository.findById(id);
        if(address.isEmpty()) {
            throw new AddressException("Address with id: " + id + " not found");
        }
        return address.get();
    }

    @Override
    public Address creatAddress(InputAddressDtoV1 inputAddress) {
        Address address = new Address(inputAddress.getCity(), inputAddress.getStreet(), inputAddress.getNumber(), inputAddress.getPostalCode());
        return repository.save(address);
    }

    @Override
    public Address updateAddress(InputAddressDtoV1 inputAddress, Long id) throws AddressException {
        Address address = findAddressById(id);
        address.setCity(inputAddress.getCity());
        address.setStreet(inputAddress.getStreet());
        address.setNumber(inputAddress.getNumber());
        address.setPostalCode(inputAddress.getPostalCode());
        return repository.save(address);
    }

    @Override
    public void deleteAddress(Long id) throws AddressException {
        repository.delete(findAddressById(id));
    }
}
