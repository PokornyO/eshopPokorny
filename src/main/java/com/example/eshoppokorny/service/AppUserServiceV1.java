package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.exceptions.RoleException;
import com.example.eshoppokorny.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserServiceV1 implements AppUserService {
    private final AppUserRepository repository;
    private final RoleService roleService;


    @Override
    public List<AppUser> getActiveUsers(Boolean active) {
        return repository.findAppUserByActive(active);
    }

    @Override
    public List<AppUser> findUsersByRole(String role) {
        return repository.findAppUsersByRoleName(role);
    }

    @Override
    public List<AppUser> getAllAppUsers() {
        return repository.findAll();
    }
    @Transactional
    @Override
    public AppUser findUserById(Long id) throws AppUserException {
        Optional<AppUser> appUser = repository.findById(id);
        if(appUser.isEmpty()) {
            throw new AppUserException("User with id: " + id + " not found");
        }
        return appUser.get();
    }
    @Transactional
    @Override
    public Optional<AppUser> findUserByUsername(String username) {
        return repository.findAppUsersByUsername(username);
    }
    @Transactional
    @Override
    public AppUser createAppUse(InputAppUserDtoV1 inputUser) throws RoleException {
        AppUser user = new AppUser(inputUser.getUsername(), inputUser.getPassword(), inputUser.isActive(), new Date(), new Date());
        Role role = roleService.findById(inputUser.getRoleId());
        user.getRoles().clear();
        user.getRoles().add(role);
        return repository.save(user);
    }
    @Transactional
    @Override
    public AppUser updateAppUser(AppUser appUser) {
        return repository.save(appUser);
    }
    @Transactional
    @Override
    public AppUser updateAppUser(InputAppUserDtoV1 appUser, Long id) throws AppUserException, RoleException {
        AppUser user = findUserById(id);
        user.setActive(appUser.isActive());
        user.setUsername(appUser.getUsername());
        user.setPassword(appUser.getPassword());
        user.setUpdate_date(new Date());
        Role role = roleService.findById(appUser.getRoleId());
        user.getRoles().clear();
        user.getRoles().add(role);
        return repository.save(user);
    }
    @Transactional
    @Override
    public void deleteAppUser(Long id) throws AppUserException {
        repository.delete(findUserById(id));
    }

    @Override
    public boolean isUserUnique(String username) {
        return repository.findByUsername(username) == null;
    }

    @Override
    public boolean isEmailUnique(String email) {
        return repository.findAppUserByEmail(email) == null;
    }

}
