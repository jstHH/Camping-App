package com.example.backend.service;

import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.Booking;
import com.example.backend.model.Spending;
import com.example.backend.repository.SpendingRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SpendingServiceTest {
    SpendingRepository spendingRepository = mock(SpendingRepository.class);
    SpendingService spendingService = new SpendingService(spendingRepository);

    @Test
    void getSpendings() {
        //given
        Spending testSpending1 = Spending.builder()
                .id("1")
                .itemID("123abc")
                .owner("owner1")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .bookings(List.of(new Booking("owner1", new BigDecimal("20")),
                        new Booking("involved1", new BigDecimal("-10")),
                        new Booking("involved2", new BigDecimal("-10"))))
                .build();

        Spending testSpending2 = Spending.builder()
                .id("2")
                .itemID("456def")
                .owner("owner2")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .bookings(List.of(new Booking("owner2", new BigDecimal("20")),
                        new Booking("involved1", new BigDecimal("-10")),
                        new Booking("involved2", new BigDecimal("-10"))))
                .build();

        when(spendingRepository.findAll()).thenReturn(List.of(testSpending1, testSpending2));

        //when
        List<Spending> actual = spendingService.getSpendings();

        //then
        List<Spending> expected = List.of(testSpending1, testSpending2);
        verify(spendingRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void createBookings() {
        //given
        SpendingItemDTO testSpendingDTO = SpendingItemDTO.builder()
                .title("Testspending")
                .itemID("123abc")
                .itemClass("car")
                .owner("owner1")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .build();

        //when
        List<Booking> actual = spendingService.createBookings(testSpendingDTO);

        //then
        List<Booking> expected = List.of(new Booking(testSpendingDTO.getOwner(), new BigDecimal(20)),
                new Booking(testSpendingDTO.getInvolved().get(0), new BigDecimal(-10)),
                new Booking(testSpendingDTO.getInvolved().get(1), new BigDecimal(-10)));

        assertEquals(expected, actual);
    }

    @Test
    void addSpending() {
        //given
        SpendingItemDTO testSpendingDTO = SpendingItemDTO.builder()
                .title("Testspending")
                .itemID("123abc")
                .itemClass("car")
                .owner("owner1")
                .involved(List.of("involved1", "involved 2"))
                .amount(new BigDecimal("30"))
                .build();

        Spending testSpendingWithID = Spending.builder()
                .id("1")
                .title(testSpendingDTO.getTitle())
                .itemID(testSpendingDTO.getItemID())
                .itemClass(testSpendingDTO.getItemClass())
                .owner(testSpendingDTO.getOwner())
                .involved(testSpendingDTO.getInvolved())
                .amount(testSpendingDTO.getAmount())
                .bookings(spendingService.createBookings(testSpendingDTO))
                .build();

        Spending testSpendingWithoutID = Spending.builder()
                .title(testSpendingDTO.getTitle())
                .itemID(testSpendingDTO.getItemID())
                .itemClass(testSpendingDTO.getItemClass())
                .owner(testSpendingDTO.getOwner())
                .involved(testSpendingDTO.getInvolved())
                .amount(testSpendingDTO.getAmount())
                .bookings(spendingService.createBookings(testSpendingDTO))
                .build();

        when(spendingRepository.insert(testSpendingWithoutID)).thenReturn(testSpendingWithID);

        //when
        Spending actual = spendingService.addSpending(testSpendingDTO);

        //then
        Spending expected = testSpendingWithID;
        verify(spendingRepository).insert(testSpendingWithoutID);
        assertEquals(expected, actual);
    }
}