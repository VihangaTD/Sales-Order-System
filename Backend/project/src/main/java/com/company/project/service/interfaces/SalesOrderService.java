package com.company.project.service.interfaces;

import com.company.project.dto.SalesOrderCreateRequestDto;
import com.company.project.dto.SalesOrderResponseDto;

import java.util.List;

public interface SalesOrderService {

    SalesOrderResponseDto createOrder(SalesOrderCreateRequestDto request);

    SalesOrderResponseDto getOrderById(Long id);

    List<SalesOrderResponseDto> getAllOrders();

    SalesOrderResponseDto updateOrder(Long id,
                                      SalesOrderCreateRequestDto request);
}
