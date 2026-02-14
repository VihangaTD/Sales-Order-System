package com.company.project.repository;

import com.company.project.domain.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByItemCode(String itemCode);

    Optional<Item> findByDescription(String description);
}
