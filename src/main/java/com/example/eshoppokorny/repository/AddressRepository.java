package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.entity.Item;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT a FROM Address a WHERE a.city = :city AND a.street = :street AND a.houseNumber = :number AND a.zipcode = :postalCode")
    List<Address> findByAllAttributesExceptId(@Param("city") String city, @Param("street") String street, @Param("number") int number, @Param("postalCode") int postalCode);
}
