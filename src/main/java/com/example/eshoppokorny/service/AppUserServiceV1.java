package com.example.eshoppokorny.service;

import com.example.eshoppokorny.dto.InputAppUserDtoV1;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.exceptions.AppUserException;
import com.example.eshoppokorny.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceV1 implements AppUserService {
    private final AppUserRepository repository;

    public AppUserServiceV1(AppUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<AppUser> getActiveUsers(Boolean active) {
        return repository.findAppUserByActive(active);
    }

    @Override
    public List<AppUser> findUsersByRole(String role) {
        return repository.findAppUsersByRoleName(role);
    }

    @Override
    public AppUser findUserById(Long id) throws AppUserException {
        Optional<AppUser> appUser = repository.findById(id);
        if(appUser.isEmpty()) {
            throw new AppUserException("User with id: " + id + " not found");
        }
        return appUser.get();
    }

    @Override
    public Optional<AppUser> findUserByUsername(String username) {
        return repository.findAppUsersByUsername(username);
    }

    @Override
    public AppUser createAppUse(InputAppUserDtoV1 inputUser) {
        AppUser user = new AppUser(inputUser.getUsername(), inputUser.getPassword(), inputUser.isActive(), new Date(), new Date());
        return repository.save(user);
    }

    @Override
    public AppUser updateAppUser(InputAppUserDtoV1 appUser, Long id) throws AppUserException {
        AppUser user = findUserById(id);
        user.setActive(appUser.isActive());
        user.setUsername(appUser.getUsername());
        user.setPassword(appUser.getPassword());
        user.setUpdate_date(new Date());
        return repository.save(user);
    }

    @Override
    public void deleteAppUser(Long id) throws AppUserException {
        repository.delete(findUserById(id));
    }
}
