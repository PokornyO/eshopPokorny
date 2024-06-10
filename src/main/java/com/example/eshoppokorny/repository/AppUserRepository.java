package com.example.eshoppokorny.repository;

import com.example.eshoppokorny.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findAppUserByActive(Boolean active);
    Optional<AppUser> findAppUsersByUsername(String username);
    AppUser findByUsername(String username);
    @Query("SELECT u FROM AppUser u JOIN u.roles r WHERE r.name = :role")
    List<AppUser> findAppUsersByRoleName(String role);
}
