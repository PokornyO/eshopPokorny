package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.dto.EOrderDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.EOrder;
import lombok.Data;

@Data
public class EOrderMapper {
    public static EOrderDtoV1 mapEOrderToEOrderDtoV1(EOrder order) {
        return new EOrderDtoV1(order.getId(), order.getCreationDate(), order.getPrice(), order.getAppUser(), order.getAddress(), order.getOrderItems());
    }
}
