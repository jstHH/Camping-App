package com.example.backend.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;


@Service
public class AppUserDataService {

    private final AppUserRepository appUserRepository;

    @Autowired
    public AppUserDataService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AppUserDataDTO getUserDataByLogin (String login) throws NoSuchElementException {
            AppUser appUser = appUserRepository.findByLogin(login).orElseThrow(() -> new NoSuchElementException("User not found with Login: " + login));
            return AppUserDataDTO.builder()
                    .id(appUser.getId())
                    .login(appUser.getLogin())
                    .name(appUser.getName())
                    .balance(appUser.getBalance())
                    .build();
    }
}
