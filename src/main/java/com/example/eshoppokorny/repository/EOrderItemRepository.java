package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.EOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EOrderItemRepository extends JpaRepository<EOrderItem, Long> {
}
