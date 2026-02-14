package com.company.project.service.interfaces;

import com.company.project.dto.ItemDto;

import java.util.List;

public interface ItemService {

    List<ItemDto> getAllItems();

    ItemDto getItemById(Long id);

    ItemDto getItemByItemCode(String itemCode);

    ItemDto getItemByDescription(String description);
}
