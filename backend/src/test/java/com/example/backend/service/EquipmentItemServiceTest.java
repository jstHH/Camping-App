package com.example.backend.service;

import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EquipmentItemServiceTest {
    private final EquipmentItemRepository equipmentItemRepository = mock(EquipmentItemRepository.class);

    private final EquipmentItemService equipmentItemService = new EquipmentItemService(equipmentItemRepository);

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

        when(equipmentItemRepository.findAll()).thenReturn(List.of(item1, item2));

        //when
        List<EquipmentItem> actual = equipmentItemService.getEquipmentItems();

        //then
        List<EquipmentItem> expected = List.of(item1, item2);
        verify(equipmentItemRepository).findAll();
        assertEquals(expected, actual);
    }
}