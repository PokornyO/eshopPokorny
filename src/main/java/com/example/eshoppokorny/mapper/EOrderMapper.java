package com.example.eshoppokorny.mapper;

import com.example.eshoppokorny.dto.AppUserDtoV1;
import com.example.eshoppokorny.dto.EOrderDtoV1;
import com.example.eshoppokorny.dto.EOrderItemDto;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.entity.EOrderItem;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EOrderMapper {
    public static EOrderDtoV1 mapEOrderToEOrderDtoV1(EOrder order) {
        List<EOrderItemDto> itemDtoList = new ArrayList<>();
        for(EOrderItem item : order.getOrderItems()) {
            itemDtoList.add(new EOrderItemDto(item.getItem().getName(), item.getCount()));
        }
        return new EOrderDtoV1(order.getId(), order.getCreationDate(), order.getPrice(), AppUserMapperV1.mapAppUserToAppUserDto(order.getAppUser()), AddressMapperV1.mapAddressToAddressDtoV1(order.getAddress()), itemDtoList);
    }
}
