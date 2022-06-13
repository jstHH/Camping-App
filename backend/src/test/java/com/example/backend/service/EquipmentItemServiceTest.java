package com.example.backend.service;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EquipmentItemServiceTest {
    private final EquipmentItemRepository equipmentItemRepository = mock(EquipmentItemRepository.class);
    private final SpendingService spendingService = mock(SpendingService.class);
    private final EquipmentItemService equipmentItemService = new EquipmentItemService(equipmentItemRepository, spendingService);

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

        when(equipmentItemRepository.findAll()).thenReturn(List.of(item1, item2));

        //when
        List<EquipmentItem> actual = equipmentItemService.getEquipmentItems();

        //then
        List<EquipmentItem> expected = List.of(item1, item2);
        verify(equipmentItemRepository).findAll();
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

        EquipmentItem testItem = EquipmentItem.builder()
                .id("TestID")
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .spending("")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.insert(EquipmentItem.builder()
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .spending("")
                .build())).thenReturn(testItem);

        //when
        EquipmentItem actual = equipmentItemService.addEquipmentItem(testItemDTO);

        //then
        EquipmentItem expected = testItem;
        verify(equipmentItemRepository).insert(EquipmentItem.builder()
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .spending("")
                .build());
        assertEquals(expected, actual);
    }

    @Test
    void getEquipmentItemByID() {
        //given
        EquipmentItem testItem = EquipmentItem.builder()
                .id("TestID")
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.findById(testItem.getId())).thenReturn(Optional.of(testItem));

        //when
        EquipmentItem actual = equipmentItemService.getEquipmentItemByID(testItem.getId());

        //then
        EquipmentItem expected = testItem;
        verify(equipmentItemRepository).findById(testItem.getId());
        assertEquals(expected, actual);
    }

    @Test
    void updateEquipmentItem() {
        //given
        String testID = "123xyz";
        EquipmentItemDTO testItemDTO = EquipmentItemDTO.builder()
                .title("testtitle")
                .description("testdescription")
                .involved(new ArrayList<>(Arrays.asList("User1")))
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        EquipmentItem testItem = EquipmentItem.builder()
                .id(testID)
                .title("testtitle")
                .description("testdescription")
                .involved(new ArrayList<>(Arrays.asList("User1")))
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.save(testItem)).thenReturn(testItem);

        //when
        EquipmentItem actual = equipmentItemService.updateEquipmentItem(testItemDTO, testID);

        //then
        EquipmentItem expected = testItem;
        verify(equipmentItemRepository).save(testItem);
        assertEquals(expected, actual);
    }

    @Test
    void deleteEquipmentItem_whenValid_thenReturnItemID() {
        //given
        EquipmentItem testItem = EquipmentItem.builder()
                .id("TestID")
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.findById(testItem.getId())).thenReturn(Optional.of(testItem), Optional.empty());

        //when
        String actual = equipmentItemService.deleteEquipmentItem(testItem.getId());

        //then
        String expected = testItem.getId();
        verify(equipmentItemRepository, times(2)).findById(testItem.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteEquipmentItem_whenIDInValid_thenReturnMessageString() {
        //given
        EquipmentItem testItem = EquipmentItem.builder()
                .id("TestID")
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.findById(testItem.getId())).thenReturn(Optional.empty());

        //when
        String actual = equipmentItemService.deleteEquipmentItem(testItem.getId());

        //then
        String expected = "Item with Id " + testItem.getId() + " not found";
        verify(equipmentItemRepository).findById(testItem.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteEquipmentItem_whenDeletionFailed_thenReturnMessageString() {
        //given
        EquipmentItem testItem = EquipmentItem.builder()
                .id("TestID")
                .title("testtitle")
                .description("testdescription")
                .owner("testownerID")
                .done(false)
                .important(false)
                .build();

        when(equipmentItemRepository.findById(testItem.getId())).thenReturn(Optional.of(testItem));

        //when
        String actual = equipmentItemService.deleteEquipmentItem(testItem.getId());

        //then
        String expected = "Deletion failed";
        verify(equipmentItemRepository, times(2)).findById(testItem.getId());
        assertEquals(expected, actual);
    }
}