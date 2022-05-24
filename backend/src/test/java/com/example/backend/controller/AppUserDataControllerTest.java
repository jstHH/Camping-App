package com.example.backend.controller;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.security.model.AppUserLoginDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserDataControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private WebTestClient webTestClient;

    private final AppUser user = AppUser.builder()
            .id("123")
            .login("test@test.de")
            .password("test123")
            .name("Max Musteruser")
            .balance(new BigDecimal("2.5"))
            .build();

    @LocalServerPort
    private int port;

    @BeforeEach
    public void cleanUp() {
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        AppUser testUser = AppUser.builder()
                .id(user.getId())
                .login(user.getLogin())
                .password(hashedPassword)
                .name(user.getName())
                .balance(user.getBalance())
                .build();
        appUserRepository.save(testUser);

        return webTestClient.post()
                .uri("/auth/login")
                .bodyValue(AppUserLoginDTO.builder()
                        .login(user.getLogin())
                        .password(user.getPassword())
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }

    @Test
    void getAppUserData() {
        //given

        //when
        AppUserDataDTO actual = webTestClient.get()
                .uri("http://localhost:" + port + "/user/current")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(AppUserDataDTO.class)
                .returnResult()
                .getResponseBody();

        //then
        AppUserDataDTO expected = AppUserDataDTO.builder()
                .id("123")
                .login("test@test.de")
                .name("Max Musteruser")
                .balance(new BigDecimal("2.5"))
                .build();

        assertEquals(expected, actual);
    }

    @Test
    void getAllAppUsersData() {
        //given
        AppUser user2 = AppUser.builder()
                .id("456")
                .login("test2@test.de")
                .password("test123")
                .name("Miriam Musteruser")
                .balance(new BigDecimal("5.2"))
                .build();

        appUserRepository.insert(user2);

        //when
        List<AppUserDataDTO> actual = webTestClient.get()
                .uri("http://localhost:" + port + "/user")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(AppUserDataDTO.class)
                .returnResult()
                .getResponseBody();

        //then
        AppUserDataDTO userDTO = AppUserDataDTO.builder()
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

        List<AppUserDataDTO> expected = List.of(userDTO, user2DTO);
        assertEquals(expected, actual);
    }
}