package com.company.project.config;

import com.company.project.domain.entity.SalesOrder;
import com.company.project.domain.entity.SalesOrderItem;
import com.company.project.dto.SalesOrderItemResponseDto;
import com.company.project.dto.SalesOrderResponseDto;

import java.util.stream.Collectors;

public class SalesOrderMapper {
    private SalesOrderMapper() {}

    public static SalesOrderResponseDto toDto(SalesOrder order) {
        if (order == null) return null;

        return SalesOrderResponseDto.builder()
                .id(order.getId())
                .client(ClientMapper.toDto(order.getClient()))
                .invoiceNo(order.getInvoiceNo())
                .invoiceDate(order.getInvoiceDate())
                .referenceNo(order.getReferenceNo())
                .note(order.getNote())
                .totalExcl(order.getTotalExcl())
                .totalTax(order.getTotalTax())
                .totalIncl(order.getTotalIncl())
                .items(order.getItems().stream().map(SalesOrderMapper::toLineDto).collect(Collectors.toList()))
                .build();
    }

    private static SalesOrderItemResponseDto toLineDto(SalesOrderItem line) {
        return SalesOrderItemResponseDto.builder()
                .id(line.getId())
                .itemId(line.getItem().getId())
                .itemCode(line.getItem().getItemCode())
                .description(line.getItem().getDescription())
                .note(line.getNote())
                .quantity(line.getQuantity())
                .taxRate(line.getTaxRate())
                .price(line.getPrice())
                .exclAmount(line.getExclAmount())
                .taxAmount(line.getTaxAmount())
                .inclAmount(line.getInclAmount())
                .build();
    }
}

