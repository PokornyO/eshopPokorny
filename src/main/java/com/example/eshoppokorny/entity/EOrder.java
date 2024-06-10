package com.example.eshoppokorny.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class EOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date creationDate;
    private double price;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "appUser_id")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name = "address_id")
    @JsonIgnore
    private Address address;
    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private Set<EOrderItem> orderItems;
}
