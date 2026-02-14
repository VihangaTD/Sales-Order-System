package com.company.project.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderCreateRequestDto {

    @NotNull
    private Long clientId;

    @NotBlank
    private String invoiceNo;

    private LocalDate invoiceDate;
    private String referenceNo;
    private String note;

    @Valid
    @NotNull
    private List<SalesOrderItemRequestDto> items;
}
