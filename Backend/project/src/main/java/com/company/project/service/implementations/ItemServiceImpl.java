package com.company.project.service.implementations;

import com.company.project.config.ItemMapper;
import com.company.project.domain.entity.Item;
import com.company.project.dto.ItemDto;
import com.company.project.exception.ResourceNotFoundException;
import com.company.project.repository.ItemRepository;
import com.company.project.service.interfaces.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public List<ItemDto> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(ItemMapper::toDto)
                .toList();
    }

    @Override
    public ItemDto getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Item not found"));

        return ItemMapper.toDto(item);
    }

    @Override
    public ItemDto getItemByItemCode(String itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(()->
                        new ResourceNotFoundException("Item not found"));
        return ItemMapper.toDto(item);
    }

    @Override
    public ItemDto getItemByDescription(String description) {
        Item item = itemRepository.findByDescription(description)
                .orElseThrow(()->
                        new ResourceNotFoundException("Item not found"));
        return ItemMapper.toDto(item);
    }
}
