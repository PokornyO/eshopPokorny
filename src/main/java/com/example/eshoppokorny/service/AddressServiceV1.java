package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAddressDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.exceptions.AddressException;
import com.example.eshoppokorny.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public Address findAddressByAppUserId(Long id) throws AddressException {
        return null;
    }

    @Override
    public Address creatAddress(InputAddressDtoV1 inputAddress) {
        Address address = new Address(inputAddress.getCity(), inputAddress.getStreet(), inputAddress.getHouseNumber(), inputAddress.getZipcode());
        return repository.save(address);
    }

    @Override
    public Address updateAddress(InputAddressDtoV1 inputAddress, Long id) throws AddressException {
        Address address = findAddressById(id);
        address.setCity(inputAddress.getCity());
        address.setStreet(inputAddress.getStreet());
        address.setHouseNumber(inputAddress.getHouseNumber());
        address.setZipcode(inputAddress.getZipcode());
        return repository.save(address);
    }

    @Override
    public boolean exists(InputAddressDtoV1 inputAddress) {
        List<Address> existingAddresses = repository.findByAllAttributesExceptId(
                inputAddress.getCity(),
                inputAddress.getStreet(),
                inputAddress.getHouseNumber(),
                inputAddress.getZipcode());
        return !existingAddresses.isEmpty();
    }

    @Override
    public List<Address> findByAllAttributes(InputAddressDtoV1 inputAddress) {
        return repository.findByAllAttributesExceptId(inputAddress.getCity(), inputAddress.getStreet(), inputAddress.getHouseNumber(), inputAddress.getZipcode());
    }

    @Override
    public void deleteAddress(Long id) throws AddressException {
        repository.delete(findAddressById(id));
    }
}
