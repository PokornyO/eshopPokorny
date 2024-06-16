package com.example.eshoppokorny.service;

import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.exceptions.RoleException;

import java.util.List;

public interface RoleService {
    List<Role> getAllRole();
    Role findById(Long id) throws RoleException;
}
