package com.example.backend.controller;

import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.repository.TentItemRepository;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TentControllerTest {

    private String jwtToken;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    TentItemRepository tentItemRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    public void cleanUp() {
        tentItemRepository.deleteAll();
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
    void getTentItems() {
        //given
        TentItem testTent = TentItem.builder()
                .id("1")
                .title("Zelt")
                .description("groß")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        tentItemRepository.insert(testTent);

        //when
        List<TentItem> actual = webTestClient.get()
                .uri("http://localhost:" + port + "/project/tents")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectBodyList(TentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        List<TentItem> expected = List.of(testTent);
        assertEquals(expected, actual);
    }

    @Test
    void addTentItem() {
        //given
        TentItem testTent = TentItem.builder()
                .id("1")
                .title("Zelt")
                .description("groß")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        TentItemDTO testTentDTO = TentItemDTO.builder()
                .title("Zelt")
                .description("groß")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        //when
        TentItem actualItem = webTestClient.post()
                .uri("http://localhost:" + port + "/project/tents")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(testTent)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(TentItem.class)
                .returnResult()
                .getResponseBody();

        List<TentItem> actualList = webTestClient.get()
                .uri("http://localhost:" + port + "/project/tents")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectBodyList(TentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        TentItem expectedItem = TentItem.builder()
                .id(actualItem.getId())
                .title("Zelt")
                .description("groß")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        List<TentItem> expectedList = List.of(expectedItem);

        assertEquals(expectedItem, actualItem);
        assertEquals(expectedList, actualList);
    }

    @Test
    void getTentItemByID() {
        //given
        TentItem testTent = TentItem.builder()
                .id("1")
                .title("Zelt")
                .description("groß")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        tentItemRepository.insert(testTent);

        //when
        TentItem actual = webTestClient.get()
                .uri("http://localhost:" + port + "/project/tents/" + testTent.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectBody(TentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        TentItem expected = testTent;
        assertEquals(expected, actual);
    }
}