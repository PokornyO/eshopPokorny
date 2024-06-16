package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Transactional
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findItemByName(String name);

}
