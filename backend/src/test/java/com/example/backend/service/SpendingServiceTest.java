package com.example.backend.service;

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
}