package com.example.backend.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;

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
                .balance(2.5)
                .build();

        when(appUserRepository.findByLogin("test@test.de")).thenReturn(Optional.of(testUser));

        //when
        AppUserDataDTO actual = appUserDataService.getUserDataByLogin("test@test.de");

        //then
        AppUserDataDTO expected = AppUserDataDTO.builder()
                .id("123")
                .login("test@test.de")
                .name("Max Musteruser")
                .balance(2.5)
                .build();

        verify(appUserRepository).findByLogin("test@test.de");
        assertEquals(expected, actual);
    }
}