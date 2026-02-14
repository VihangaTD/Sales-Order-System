package com.company.project.controller;

import com.company.project.dto.ItemDto;
import com.company.project.service.interfaces.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ItemDto> getByCode(@PathVariable String code) {
        return ResponseEntity.ok(itemService.getItemByItemCode(code));
    }

    @GetMapping("/description/{description}")
    public ResponseEntity<ItemDto> getByDescription(@PathVariable String description) {
        return ResponseEntity.ok(itemService.getItemByDescription(description));
    }
}
