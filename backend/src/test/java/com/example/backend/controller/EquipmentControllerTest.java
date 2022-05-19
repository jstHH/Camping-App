package com.example.backend.controller;

import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EquipmentControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private EquipmentItemRepository equipmentItemRepository;

    @BeforeEach
    public void cleanUp() {
        equipmentItemRepository.deleteAll();
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
                .uri("/project/equipment")
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