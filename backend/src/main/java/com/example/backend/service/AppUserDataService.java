package com.example.backend.service;

import com.example.backend.model.Booking;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AppUserDataService {

    private final AppUserRepository appUserRepository;

    @Autowired
    public AppUserDataService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;

    }

    public AppUserDataDTO getUserDataByLogin(String login) throws NoSuchElementException {
        AppUser appUser = appUserRepository.findByLogin(login).orElseThrow(() -> new NoSuchElementException("User not found with Login: " + login));
        return AppUserDataDTO.builder()
                .id(appUser.getId())
                .login(appUser.getLogin())
                .name(appUser.getName())
                .balance(appUser.getBalance())
                .build();
    }

    public List<AppUserDataDTO> getAllUsersData() {
        List<AppUser> appUsers = appUserRepository.findAll();
        List<AppUserDataDTO> appUsersData = new ArrayList<>();
        for (AppUser element : appUsers) {
            appUsersData.add(AppUserDataDTO.builder()
                    .id(element.getId())
                    .login(element.getLogin())
                    .name(element.getName())
                    .balance(element.getBalance())
                    .build());
        }
        return appUsersData;
    }

    public void calculateUserBalance (List<Booking> bookings) {
        List<AppUser> allUsers = appUserRepository.findAll();
        for (AppUser user: allUsers) {
            BigDecimal newBalance = new BigDecimal(0);
            List<Booking> userBookings = bookings.stream().filter(element -> element.getUser().equals(user.getId())).toList();
            for (Booking booking: userBookings) {
               newBalance = newBalance.add(booking.getAmount());
            }
            user.setBalance(newBalance);
            appUserRepository.save(user);
        }
    }
}
