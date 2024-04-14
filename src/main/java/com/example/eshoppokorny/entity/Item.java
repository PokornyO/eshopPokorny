package com.example.eshoppokorny.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double price;
    private String name;
    private int inStockCount;
    private String description;
    @OneToMany(mappedBy = "id")
    private Set<EOrderItem> orderItems;
    public Item(double price, String name, int inStockCount, String description) {
        this.price = price;
        this.name = name;
        this.inStockCount = inStockCount;
        this.description = description;
    }
}

