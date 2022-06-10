package com.example.backend.controller;

import com.example.backend.model.Booking;
import com.example.backend.model.Spending;
import com.example.backend.repository.CarItemRepository;
import com.example.backend.repository.SpendingRepository;
import com.example.backend.security.model.AppUser;
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
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpendingControllerTest {

    private String jwtToken;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    SpendingRepository spendingRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    public void cleanUp() {
        spendingRepository.deleteAll();
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode("password");
        AppUser testUser = AppUser.builder()
                .login("testlogin")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);

        return webTestClient.post()
                .uri("/auth/login")
                .bodyValue(AppUserLoginDTO.builder()
                        .login("testlogin")
                        .password("password")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }

    @Test
    void getSpendings() {
        //given
        Spending testSpending1 = Spending.builder()
                .id("1")
                .itemID("123abc")
                .owner("owner1")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .bookings(List.of(new Booking("owner1", new BigDecimal("20")),
                        new Booking("involved1", new BigDecimal("-10")),
                        new Booking("involved2", new BigDecimal("-10"))))
                .build();

        Spending testSpending2 = Spending.builder()
                .id("2")
                .itemID("456def")
                .owner("owner2")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .bookings(List.of(new Booking("owner2", new BigDecimal("20")),
                        new Booking("involved1", new BigDecimal("-10")),
                        new Booking("involved2", new BigDecimal("-10"))))
                .build();

        spendingRepository.insert(testSpending1);
        spendingRepository.insert(testSpending2);

        //when
        List<Spending> actual = webTestClient.get()
                .uri("http://localhost:" + port + "/project/spendings")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(Spending.class)
                .returnResult()
                .getResponseBody();

        //then
        List<Spending> expected = List.of(testSpending1, testSpending2);
        assertEquals(expected, actual);
    }
}