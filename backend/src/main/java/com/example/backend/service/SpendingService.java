package com.example.backend.service;


import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.Booking;
import com.example.backend.model.Spending;
import com.example.backend.repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class SpendingService {
    private final SpendingRepository spendingRepository;

    @Autowired
    public SpendingService(SpendingRepository spendingRepository) {
        this.spendingRepository = spendingRepository;
    }

    public List<Spending> getSpendings() {
        return spendingRepository.findAll();
    }

    public Spending addSpending(SpendingItemDTO spendingItemDTO) {
        return spendingRepository.insert(Spending.builder()
                .title(spendingItemDTO.getTitle())
                .itemID(spendingItemDTO.getItemID())
                .itemClass(spendingItemDTO.getItemClass())
                .owner(spendingItemDTO.getOwner())
                .involved(spendingItemDTO.getInvolved())
                .amount(spendingItemDTO.getAmount())
                .bookings(createBookings(spendingItemDTO))
                .build());
    }

    public List<Booking> createBookings(SpendingItemDTO spendingItemDTO) {
        List<Booking> newBookings = new ArrayList<>();
        BigDecimal share = spendingItemDTO.getAmount().divide(new BigDecimal(spendingItemDTO.getInvolved().size() + 1));
        newBookings.add(new Booking(spendingItemDTO.getOwner(), spendingItemDTO.getAmount().subtract(share)));
        for (String userID : spendingItemDTO.getInvolved()) {
            newBookings.add(new Booking(userID, new BigDecimal(0).subtract(share)));
        }
        return newBookings;
    }

}
