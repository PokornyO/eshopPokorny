package com.example.eshoppokorny.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String city;
    private String street;
    private int houseNumber;
    private int zipcode;

    public Address(String city, String street, int number, int postalCode) {
        this.city = city;
        this.street = street;
        this.houseNumber = number;
        this.zipcode = postalCode;
    }
}
