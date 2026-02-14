package com.company.project.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "sales_order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id")
    private SalesOrder order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(length = 500)
    private String note;

    @Column(nullable = false, scale = 2)
    private BigDecimal quantity;

    @Column(nullable = false, scale = 2)
    private BigDecimal taxRate;

    @Column(nullable = false, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, scale = 2)
    private BigDecimal exclAmount;

    @Column(nullable = false, scale = 2)
    private BigDecimal taxAmount;

    @Column(nullable = false, scale = 2)
    private BigDecimal inclAmount;
}
