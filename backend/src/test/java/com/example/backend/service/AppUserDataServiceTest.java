package com.example.backend.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserDataServiceTest {
    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);

    private final AppUserDataService appUserDataService = new AppUserDataService(appUserRepository);

    @Test
    void getUserDataByLogin() {
        //given
        AppUser testUser = AppUser.builder()
                .id("123")
                .login("test@test.de")
                .password("test123")
                .name("Max Musteruser")
                .balance(new BigDecimal("2.5"))
                .build();

        when(appUserRepository.findByLogin("test@test.de")).thenReturn(Optional.of(testUser));

        //when
        AppUserDataDTO actual = appUserDataService.getUserDataByLogin("test@test.de");

        //then
        AppUserDataDTO expected = AppUserDataDTO.builder()
                .id("123")
                .login("test@test.de")
                .name("Max Musteruser")
                .balance(new BigDecimal("2.5"))
                .build();

        verify(appUserRepository).findByLogin("test@test.de");
        assertEquals(expected, actual);
    }

    @Test
    void getAllUsersData() {
        //given
        AppUser user1 = AppUser.builder()
                .id("123")
                .login("test@test.de")
                .password("test123")
                .name("Max Musteruser")
                .balance(new BigDecimal("2.5"))
                .build();

        AppUser user2 = AppUser.builder()
                .id("456")
                .login("test2@test.de")
                .password("test123")
                .name("Miriam Musteruser")
                .balance(new BigDecimal("5.2"))
                .build();

        when(appUserRepository.findAll()).thenReturn(List.of(user1, user2));

        //when
        List<AppUserDataDTO> actual = appUserDataService.getAllUsersData();

        //then
        AppUserDataDTO user1DTO = AppUserDataDTO.builder()
                .id("123")
                .login("test@test.de")
                .name("Max Musteruser")
                .balance(new BigDecimal("2.5"))
                .build();

        AppUserDataDTO user2DTO = AppUserDataDTO.builder()
                .id("456")
                .login("test2@test.de")
                .name("Miriam Musteruser")
                .balance(new BigDecimal("5.2"))
                .build();

        List<AppUserDataDTO> expected = List.of(user1DTO, user2DTO);
        verify(appUserRepository).findAll();
        assertEquals(expected, actual);
    }
}