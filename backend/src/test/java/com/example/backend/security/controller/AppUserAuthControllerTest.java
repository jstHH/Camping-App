package com.example.backend.security.controller;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.repository.AppUserRepository;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserAuthControllerTest {

    @Value("${camping-app.jwt.secret}")
    private String jwtSecret;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    WebTestClient webTestClient;

    @BeforeEach
    void cleanUp () {
        appUserRepository.deleteAll();
    }

    private AppUser createAppUser() {
        String hashedPassword = passwordEncoder.encode("password");
        AppUser testUser = AppUser.builder()
                .login("testuser")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);
        return testUser;
    }

    @Test
    void login() {
        //given
        AppUser testUser = createAppUser();

        //when
         String jwt = webTestClient.post()
                 .uri("/auth/login")
                 .bodyValue(AppUser.builder()
                         .login("testuser")
                         .password("password")
                         .build())
                 .exchange()
                 .expectStatus().isOk()
                 .expectBody(String.class)
                 .returnResult()
                 .getResponseBody();

         String actual = Jwts.parser()
                 .setSigningKey(jwtSecret)
                 .parseClaimsJws(jwt)
                 .getBody()
                 .getSubject();

         //then
         String expected = testUser.getLogin();
         assertEquals(expected, actual);

    }
}