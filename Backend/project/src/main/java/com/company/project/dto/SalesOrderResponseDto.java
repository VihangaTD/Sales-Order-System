package com.company.project.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderResponseDto {
    private Long id;

    private ClientDto client;

    private String invoiceNo;
    private LocalDate invoiceDate;
    private String referenceNo;
    private String note;

    private BigDecimal totalExcl;
    private BigDecimal totalTax;
    private BigDecimal totalIncl;

    private List<SalesOrderItemResponseDto> items;
}
