package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.Item;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
