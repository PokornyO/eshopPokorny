package com.example.eshoppokorny.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private List<EOrder> orders = new ArrayList<>();


    public Address(String city, String street, int number, int postalCode) {
        this.city = city;
        this.street = street;
        this.houseNumber = number;
        this.zipcode = postalCode;
    }
}
