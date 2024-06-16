package com.example.eshoppokorny.service;

import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.exceptions.EOrderException;
import com.example.eshoppokorny.exceptions.RoleException;
import com.example.eshoppokorny.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoleServiceV1 implements RoleService{
    private final RoleRepository repository;
    @Override
    public List<Role> getAllRole() {
        return repository.findAll();
    }

    @Override
    public Role findById(Long id) throws RoleException {
        Optional<Role> role = repository.findById(id);
        if(role.isEmpty()) {
            throw new RoleException("Role with id: " + id + " not found");
        }
        return role.get();
    }
}
