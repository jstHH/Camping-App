package com.example.backend.security.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.repository.AppUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserDetailService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    public AppUserDetailService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        return new User(appUser.getLogin(), appUser.getPassword(), List.of());
    }
}
