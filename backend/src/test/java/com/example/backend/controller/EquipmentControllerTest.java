package com.example.backend.controller;

import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EquipmentControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private EquipmentItemRepository equipmentItemRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    public void cleanUp() {
        equipmentItemRepository.deleteAll();
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
                .bodyValue(AppUserDTO.builder()
                        .login("testlogin")
                        .password("password")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }

    @Test
    void getEquipmentItems() {
        //given
        EquipmentItem item1 = EquipmentItem.builder()
                .id("1")
                .title("Testtitel1")
                .description("Beschreibung1")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2")))
                .spending("spendingID1")
                .isImportant(false)
                .isDone(false)
                .build();

        EquipmentItem item2 = EquipmentItem.builder()
                .id("2")
                .title("Testtitel2")
                .description("Beschreibung2")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("Involved3", "Involved4")))
                .spending("spendingID2")
                .isImportant(false)
                .isDone(false)
                .build();

        equipmentItemRepository.insert(item1);
        equipmentItemRepository.insert(item2);

        //when
        List<EquipmentItem> actual = webTestClient.get()
                .uri("http://localhost:" + port + "/project/equipment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        List<EquipmentItem> expected = List.of(item1, item2);
        assertEquals(expected, actual);
    }
}