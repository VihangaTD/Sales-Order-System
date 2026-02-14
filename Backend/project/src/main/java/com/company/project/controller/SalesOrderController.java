package com.company.project.controller;

import com.company.project.dto.SalesOrderCreateRequestDto;
import com.company.project.dto.SalesOrderResponseDto;
import com.company.project.service.interfaces.SalesOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    @PostMapping
    public ResponseEntity<SalesOrderResponseDto> createOrder(
            @Valid @RequestBody SalesOrderCreateRequestDto request
    ) {
        SalesOrderResponseDto saved = salesOrderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<SalesOrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(salesOrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesOrderResponseDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(salesOrderService.getOrderById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesOrderResponseDto> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody SalesOrderCreateRequestDto request
    ) {
        return ResponseEntity.ok(salesOrderService.updateOrder(id, request));
    }
}
