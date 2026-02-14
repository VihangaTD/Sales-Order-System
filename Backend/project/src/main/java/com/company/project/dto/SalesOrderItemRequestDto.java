package com.company.project.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderItemRequestDto {

    @NotNull
    private Long itemId;

    private String note;

    @NotNull
    private BigDecimal quantity;

    @NotNull
    private BigDecimal taxRate;
}
