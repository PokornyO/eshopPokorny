package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Transactional
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findAppUserByActive(Boolean active);
    Optional<AppUser> findAppUsersByUsername(String username);
    AppUser findByUsername(String username);
    AppUser findAppUserByEmail(String email);
    @Query("select u from AppUser u")
    Page<AppUser> findAllAppUsers(Pageable pageable);
    @Query("SELECT u FROM AppUser u JOIN u.roles r WHERE r.name = :role")
    List<AppUser> findAppUsersByRoleName(String role);
}
