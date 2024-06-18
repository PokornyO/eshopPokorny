package com.example.eshoppokorny.dto;

import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.EOrderItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class EOrderDtoV1 {
    private long id;
    private Date creationDate;
    private double price;
    private AppUserDtoV1 appUser;
    private AddressDtoV1 address;
    private List<EOrderItemDto> orderItems;
}
