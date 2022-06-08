package com.example.backend.service;

import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.repository.TentItemRepository;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TentItemServiceTest {
    private final TentItemRepository tentItemRepository = mock(TentItemRepository.class);
    private final TentItemService tentItemService = new TentItemService(tentItemRepository);

    @Test
    void getTentItems() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        TentItem testTent2 = TentItem.builder()
                .id("2")
                .title("Kuppel")
                .description("groß")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.findAll()).thenReturn(List.of(testTent1, testTent2));

        //when
        List<TentItem> actual = tentItemService.getTentItems();

        //Then
        List<TentItem> expected = List.of(testTent1, testTent2);
        verify(tentItemRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addTentItem() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        TentItem testTent1withoutID = TentItem.builder()
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        TentItemDTO testTentDTO1 = TentItemDTO.builder()
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.insert(testTent1withoutID)).thenReturn(testTent1);

        //when
        TentItem actual = tentItemService.addTentItem(testTentDTO1);

        //then
        TentItem expected = testTent1;
        verify(tentItemRepository).insert(testTent1withoutID);
        assertEquals(expected, actual);
    }

    @Test
    void getTentItemByID_whenIDvalid_returnItem() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.findById(testTent1.getId())).thenReturn(Optional.of(testTent1));

        //when
        TentItem actual =  tentItemService.getTentItemByID(testTent1.getId());

        //then
        TentItem expected = testTent1;
        assertEquals(expected, actual);
    }

    @Test
    void updateTentItem() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();


        TentItemDTO testTentDTO1 = TentItemDTO.builder()
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.save(testTent1)).thenReturn(testTent1);

        //when
        TentItem actual = tentItemService.updateTentItem("1", testTentDTO1);

        //then
        TentItem expected = testTent1;
        verify(tentItemRepository).save(testTent1);
        assertEquals(expected, actual);
    }

    @Test
    void deleteTentItem_whenIDValid_thenReturnID() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.existsById(testTent1.getId())).thenReturn(true, false);

        //when
        String actual = tentItemService.deleteTentItem(testTent1.getId());

        //then
        String expected = testTent1.getId();
        verify(tentItemRepository, times(2)).existsById(testTent1.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteTentItem_whenIDInvalid_thenReturnMessage() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.existsById(testTent1.getId())).thenReturn(false);

        //when
        String actual = tentItemService.deleteTentItem(testTent1.getId());

        //then
        String expected = "Item with ID " + testTent1.getId() + " not found.";
        verify(tentItemRepository).existsById(testTent1.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteTentItem_whenDeletionFailed_thenReturnMessage() {
        //given
        TentItem testTent1 = TentItem.builder()
                .id("1")
                .title("Iglu")
                .description("klein")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .shelter(false)
                .build();

        when(tentItemRepository.existsById(testTent1.getId())).thenReturn(true);

        //when
        String actual = tentItemService.deleteTentItem(testTent1.getId());

        //then
        String expected = "Deletion failed";
        verify(tentItemRepository, times(2)).existsById(testTent1.getId());
        assertEquals(expected, actual);
    }
}