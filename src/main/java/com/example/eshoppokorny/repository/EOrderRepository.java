package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.EOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Transactional
@Repository
public interface EOrderRepository extends JpaRepository<EOrder, Long> {
    List<EOrder> findByAppUserId(Long userId);
    @Query("select o from EOrder o")
    Page<EOrder> findAllEOrders(Pageable pageable);

    @Query("select o from EOrder o where o.appUser.id = :id")
    Page<EOrder> findEOrderByAppUserId(@Param("id") long id, Pageable pageable);
}
