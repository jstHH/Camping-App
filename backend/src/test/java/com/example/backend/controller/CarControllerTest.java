package com.example.backend.controller;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.repository.CarItemRepository;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserLoginDTO;
import com.example.backend.security.repository.AppUserRepository;
import com.example.backend.service.CarItemService;
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
class CarControllerTest {

    private String jwtToken;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    CarItemRepository carItemRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    public void cleanUp() {
        carItemRepository.deleteAll();
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
    void getCarItems() {
        //given
        CarItem testCar1 = CarItem.builder()
                .id("1")
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        CarItem testCar2 = CarItem.builder()
                .id("2")
                .title("VW Testa")
                .description("schnell")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("involved3", "involved4")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Parkplatz")
                .build();

        carItemRepository.insert(testCar1);
        carItemRepository.insert(testCar2);

        //when
        List<CarItem> actual = webTestClient.get()
                .uri("/project/cars")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(CarItem.class)
                .returnResult()
                .getResponseBody();

        //then
        List<CarItem> expected = List.of(testCar1, testCar2);
        assertEquals(expected, actual);
    }

    @Test
    void addCarItem() {
        //given
        CarItemDTO testCarDTO = CarItemDTO.builder()
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        //when
        CarItem actual = webTestClient.post()
                .uri("/project/cars")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(testCarDTO)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(CarItem.class)
                .returnResult()
                .getResponseBody();

        //then
        CarItem expected = CarItem.builder()
                .id(actual.getId())
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        assertEquals(expected,actual);
    }

    @Test
    void getCarItemByID() {
        //given
        CarItem testCar1 = CarItem.builder()
                .id("1")
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        carItemRepository.insert(testCar1);

        //when
        CarItem actual = webTestClient.get()
                .uri("/project/cars/" + testCar1.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(CarItem.class)
                .returnResult()
                .getResponseBody();

        //then
        CarItem expected = testCar1;
        assertEquals(expected, actual);
    }

    @Test
    void updateCarItem() {
        //given
        CarItem testCar1 = CarItem.builder()
                .id("1")
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        carItemRepository.insert(testCar1);

        //when
        CarItem actualCar = webTestClient.put()
                .uri("/project/cars/" + testCar1.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(testCar1)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(CarItem.class)
                .returnResult()
                .getResponseBody();

        List<CarItem> actualList = webTestClient.get()
                .uri("/project/cars/")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(CarItem.class)
                .returnResult()
                .getResponseBody();

        //then
        CarItem expectedCar = testCar1;
        List<CarItem> expectedList = List.of(testCar1);

        assertEquals(expectedCar, actualCar);
        assertEquals(expectedList, actualList);
    }
}