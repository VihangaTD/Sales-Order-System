package com.company.project.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderItemResponseDto {
    private Long id;

    private Long itemId;
    private String itemCode;
    private String description;

    private String note;
    private BigDecimal quantity;
    private BigDecimal taxRate;
    private BigDecimal price;

    private BigDecimal exclAmount;
    private BigDecimal taxAmount;
    private BigDecimal inclAmount;
}
