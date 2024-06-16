package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.EOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Transactional
@Repository
public interface EOrderRepository extends JpaRepository<EOrder, Long> {
    List<EOrder> findByAppUserId(Long userId);

}
