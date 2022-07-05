package com.example.backend.service;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.repository.CarItemRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CarItemServiceTest {
    private final CarItemRepository carItemRepository = mock(CarItemRepository.class);
    private final SpendingService spendingService = mock(SpendingService.class);
    private final AppUserDataService appUserDataService = mock(AppUserDataService.class);
    private final CarItemService carItemService = new CarItemService(carItemRepository, spendingService, appUserDataService);

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

        when(carItemRepository.findAll()).thenReturn(List.of(testCar1, testCar2));

        //when
        List<CarItem> actual = carItemService.getCarItems();

        //then
        List<CarItem> expected = List.of(testCar1, testCar2);
        verify(carItemRepository).findAll();
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

        CarItem testCar0 = CarItem.builder()
                .title("Testla")
                .description("schnell")
                .owner("owner1")
                .involved(new ArrayList<>(Arrays.asList("involved1", "involved2")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        when(carItemRepository.insert(testCar0)).thenReturn(testCar1);

        //when
        CarItem actual = carItemService.addCarItem(testCarDTO);

        //then
        CarItem expected = testCar1;
        verify(carItemRepository).insert(testCar0);
        assertEquals(actual, expected);


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

        when(carItemRepository.findById(testCar1.getId())).thenReturn(Optional.of(testCar1));

        //when
        CarItem actual = carItemService.getCarItemByID(testCar1.getId());

        //then
        CarItem expected = testCar1;
        verify(carItemRepository).findById(testCar1.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteCarItem_whenDeletionFailed_thenReturnMessageString() {
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

        when(carItemRepository.existsById(testCar1.getId())).thenReturn(true);

        //when
        String actual = carItemService.deleteCarItem(testCar1.getId());

        //then
        String expected = "Deletion failed";
        verify(carItemRepository, times(2)).existsById(testCar1.getId());
        assertEquals(expected, actual);
    }

    @Test
    void deleteCarItem_whenIDInValid_thenReturnMessageString() {
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

        when(carItemRepository.existsById(testCar1.getId())).thenReturn(false);

        //when
        String actual = carItemService.deleteCarItem(testCar1.getId());

        //then
        String expected = "Item with Id " + testCar1.getId() + " not found";
        verify(carItemRepository).existsById(testCar1.getId());
        assertEquals(expected, actual);
    }

    @Test
    void getUserWithCarIDs() {
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
                .id("1")
                .title("Testla")
                .description("schnell")
                .owner("owner2")
                .involved(new ArrayList<>(Arrays.asList("involved2", "involved3")))
                .spending("")
                .capacity(3)
                .trailer(false)
                .startLocation("Garage")
                .build();

        when(carItemRepository.findAll()).thenReturn(List.of(testCar1, testCar2));

        //when
        List<String> actual = carItemService.getUserWithCarIDs();

        //then
        List<String> expected = List.of("owner1", "involved1", "involved2", "owner2", "involved3");
        verify(carItemRepository).findAll();
        assertEquals(expected, actual);
    }
}