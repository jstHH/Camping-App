package com.example.backend.controller;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
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
    void getEquipmentItems() {
        //given
        EquipmentItem item1 = EquipmentItem.builder()
                .id("1")
                .title("Testtitel1")
                .description("Beschreibung1")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2")))
                .spending("spendingID1")
                .important(false)
                .done(false)
                .build();

        EquipmentItem item2 = EquipmentItem.builder()
                .id("2")
                .title("Testtitel2")
                .description("Beschreibung2")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("Involved3", "Involved4")))
                .spending("spendingID2")
                .important(false)
                .done(false)
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

    @Test
    void addEquipmentItem() {
        //given
        EquipmentItemDTO testItemDTO = EquipmentItemDTO.builder()
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .build();

        //when
        EquipmentItem actual = webTestClient.post()
                .uri("http://localhost:" + port + "/project/equipment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(testItemDTO)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        EquipmentItem expected = EquipmentItem.builder()
                .id(actual.getId())
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        assertEquals(expected, actual);
    }

    @Test
    void getEquipmentItemByID() {
        //given
        EquipmentItem item2 = EquipmentItem.builder()
                .id("2")
                .title("Testtitel2")
                .description("Beschreibung2")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("Involved3", "Involved4")))
                .spending("spendingID2")
                .important(false)
                .done(false)
                .build();

        equipmentItemRepository.insert(item2);

        //when
        EquipmentItem actual = webTestClient.get()
                .uri("http://localhost:" + port + "/project/equipment/" + item2.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        EquipmentItem expected = item2;
        assertEquals(expected, actual);
    }

    @Test
    void updateEquipmentItem_ifItemExistUpdateItem() {
        //given
        EquipmentItem item1 = EquipmentItem.builder()
                .id("1")
                .title("Testtitel1")
                .description("Beschreibung1")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2")))
                .spending("spendingID1")
                .important(false)
                .done(false)
                .build();
        equipmentItemRepository.insert(item1);

        //when
        EquipmentItemDTO changedItem1 = EquipmentItemDTO.builder()
                .title("geänderter Titel")
                .description("neue Beschreibung")
                .owner("neuer Owner")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2", "Involved3")))
                .spending("")
                .important(true)
                .done(false)
                .build();

        EquipmentItem actualItem = webTestClient.put()
                .uri("http://localhost:" + port + "/project/equipment/" + item1.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(changedItem1)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        List<EquipmentItem> actualItemList = webTestClient.get()
                .uri("http://localhost:" + port + "/project/equipment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        EquipmentItem expectedItem = EquipmentItem.builder()
                .id("1")
                .title("geänderter Titel")
                .description("neue Beschreibung")
                .owner("neuer Owner")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2", "Involved3")))
                .spending("")
                .important(true)
                .done(false)
                .build();

        List<EquipmentItem> expectedItemList = List.of(expectedItem);

        assertEquals(expectedItem, actualItem);
        assertEquals(expectedItemList, actualItemList);
    }

    @Test
    void deleteEquipmentItem_whenIDValid_thenReturnDeletedID() {
        //given
        EquipmentItem item1 = EquipmentItem.builder()
                .id("1")
                .title("Testtitel1")
                .description("Beschreibung1")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2")))
                .spending("spendingID1")
                .important(false)
                .done(false)
                .build();

        EquipmentItem item2 = EquipmentItem.builder()
                .id("2")
                .title("Testtitel2")
                .description("Beschreibung2")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("Involved3", "Involved4")))
                .spending("spendingID2")
                .important(false)
                .done(false)
                .build();

        equipmentItemRepository.insert(item1);
        equipmentItemRepository.insert(item2);

        //when
        String actualString = webTestClient.delete()
                .uri("http://localhost:" + port + "/project/equipment/" + item1.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        List<EquipmentItem> actualList = webTestClient.get()
                .uri("http://localhost:" + port + "/project/equipment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        String expectedString = item1.getId();
        List<EquipmentItem> expectedList = List.of(item2);

        assertEquals(expectedString, actualString);
        assertEquals(expectedList, actualList);
    }

    @Test
    void deleteEquipmentItem_whenIDInvalid_thenReturnMessageString() {
        //given
        EquipmentItem item1 = EquipmentItem.builder()
                .id("1")
                .title("Testtitel1")
                .description("Beschreibung1")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("Involved1", "Involved2")))
                .spending("spendingID1")
                .important(false)
                .done(false)
                .build();

        equipmentItemRepository.insert(item1);


        //when
        String actualString = webTestClient.delete()
                .uri("http://localhost:" + port + "/project/equipment/xxx999")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        List<EquipmentItem> actualList = webTestClient.get()
                .uri("http://localhost:" + port + "/project/equipment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(EquipmentItem.class)
                .returnResult()
                .getResponseBody();

        //then
        String expectedString = "Item with Id xxx999 not found";
        List<EquipmentItem> expectedList = List.of(item1);

        assertEquals(expectedString, actualString);
        assertEquals(expectedList, actualList);
    }
}