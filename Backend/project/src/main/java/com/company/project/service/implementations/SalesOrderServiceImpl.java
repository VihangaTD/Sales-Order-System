package com.company.project.service.implementations;

import com.company.project.config.SalesOrderMapper;
import com.company.project.domain.entity.*;
import com.company.project.dto.*;
import com.company.project.exception.ResourceNotFoundException;
import com.company.project.repository.*;
import com.company.project.service.interfaces.SalesOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SalesOrderServiceImpl implements SalesOrderService {

    private final SalesOrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ItemRepository itemRepository;

    @Override
    public SalesOrderResponseDto createOrder(SalesOrderCreateRequestDto request) {

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Client not found"));

        SalesOrder order = SalesOrder.builder()
                .invoiceNo(request.getInvoiceNo())
                .invoiceDate(request.getInvoiceDate())
                .referenceNo(request.getReferenceNo())
                .note(request.getNote())
                .client(client)
                .items(new ArrayList<>())
                .build();

        calculateAndAttachItems(order, request.getItems());

        SalesOrder saved = orderRepository.save(order);
        return SalesOrderMapper.toDto(saved);
    }

    @Override
    public SalesOrderResponseDto updateOrder(Long id,
                                             SalesOrderCreateRequestDto request) {

        SalesOrder order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Client not found"));

        order.setInvoiceNo(request.getInvoiceNo());
        order.setInvoiceDate(request.getInvoiceDate());
        order.setReferenceNo(request.getReferenceNo());
        order.setNote(request.getNote());
        order.setClient(client);

        order.getItems().clear();

        calculateAndAttachItems(order, request.getItems());

        return SalesOrderMapper.toDto(orderRepository.save(order));
    }

    @Override
    public SalesOrderResponseDto getOrderById(Long id) {

        SalesOrder order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        return SalesOrderMapper.toDto(order);
    }

    @Override
    public List<SalesOrderResponseDto> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(SalesOrderMapper::toDto)
                .toList();
    }

    // calculations
    private void calculateAndAttachItems(SalesOrder order,
                                         List<SalesOrderItemRequestDto> itemsDto) {

        BigDecimal totalExcl = BigDecimal.ZERO;
        BigDecimal totalTax = BigDecimal.ZERO;
        BigDecimal totalIncl = BigDecimal.ZERO;

        for (SalesOrderItemRequestDto dto : itemsDto) {

            Item item = itemRepository.findById(dto.getItemId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Item not found"));

            BigDecimal price = item.getPrice();

            BigDecimal excl = price.multiply(dto.getQuantity());

            BigDecimal tax = excl
                    .multiply(dto.getTaxRate())
                    .divide(BigDecimal.valueOf(100));

            BigDecimal incl = excl.add(tax);

            SalesOrderItem line = SalesOrderItem.builder()
                    .order(order)
                    .item(item)
                    .note(dto.getNote())
                    .quantity(dto.getQuantity())
                    .taxRate(dto.getTaxRate())
                    .price(price)
                    .exclAmount(excl)
                    .taxAmount(tax)
                    .inclAmount(incl)
                    .build();

            order.getItems().add(line);

            totalExcl = totalExcl.add(excl);
            totalTax = totalTax.add(tax);
            totalIncl = totalIncl.add(incl);
        }

        order.setTotalExcl(totalExcl);
        order.setTotalTax(totalTax);
        order.setTotalIncl(totalIncl);
    }
}
