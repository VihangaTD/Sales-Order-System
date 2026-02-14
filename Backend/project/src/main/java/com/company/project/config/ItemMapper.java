package com.company.project.config;

import com.company.project.domain.entity.Item;
import com.company.project.dto.ItemDto;

public class ItemMapper {
    private ItemMapper() {}

    public static ItemDto toDto(Item i) {
        if (i == null) return null;
        return ItemDto.builder()
                .id(i.getId())
                .itemCode(i.getItemCode())
                .description(i.getDescription())
                .price(i.getPrice())
                .build();
    }
}
