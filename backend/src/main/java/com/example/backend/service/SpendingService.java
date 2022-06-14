package com.example.backend.service;


import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.Booking;
import com.example.backend.model.Spending;
import com.example.backend.repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SpendingService {
    private final SpendingRepository spendingRepository;
    private final AppUserDataService appUserDataService;

    @Autowired
    public SpendingService(SpendingRepository spendingRepository, AppUserDataService appUserDataService) {
        this.spendingRepository = spendingRepository;
        this.appUserDataService = appUserDataService;
    }

    public List<Spending> getSpendings() {
        return spendingRepository.findAll();
    }

    public Spending getSpendingByID(String id) {
        return spendingRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Spending with ID " + id + " not found!"));
    }

    public Spending addSpending(SpendingItemDTO spendingItemDTO) {
        Spending newSpending = spendingRepository.insert(Spending.builder()
                .title(spendingItemDTO.getTitle())
                .itemID(spendingItemDTO.getItemID())
                .itemClass(spendingItemDTO.getItemClass())
                .owner(spendingItemDTO.getOwner())
                .involved(spendingItemDTO.getInvolved())
                .amount(spendingItemDTO.getAmount())
                .bookings(createBookings(spendingItemDTO))
                .build());
        appUserDataService.calculateUserBalance(getAllBookings());
        return newSpending;

    }

    public String updateSpending(String id, SpendingItemDTO spendingItemDTO) {
        if (spendingRepository.findById(id).isPresent()) {
            Spending changedSpending = spendingRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Spending with id " + id + " not found!"));
            spendingItemDTO.setAmount(changedSpending.getAmount());
            changedSpending.setTitle(spendingItemDTO.getTitle());
            changedSpending.setOwner(spendingItemDTO.getOwner());
            changedSpending.setInvolved(spendingItemDTO.getInvolved());
            changedSpending.setBookings(createBookings(spendingItemDTO));
            spendingRepository.save(changedSpending);
            appUserDataService.calculateUserBalance(getAllBookings());
            return id;
        }
        return "";
    }

    public String deleteSpendingByID (String id) {
        spendingRepository.deleteById(id);
        appUserDataService.calculateUserBalance(getAllBookings());
        if (!spendingRepository.existsById(id)) {
            return id;
        }
        return "Deletion failed";
    }

    public List<Booking> createBookings(SpendingItemDTO spendingItemDTO) {
        List<Booking> newBookings = new ArrayList<>();
        BigDecimal share = spendingItemDTO.getAmount().divide(new BigDecimal(spendingItemDTO.getInvolved().size() + 1), 2,RoundingMode.HALF_UP);
        newBookings.add(new Booking(spendingItemDTO.getOwner(), spendingItemDTO.getAmount().subtract(share)));
        for (String userID : spendingItemDTO.getInvolved()) {
            newBookings.add(new Booking(userID, new BigDecimal(0).subtract(share)));
        }
        return newBookings;
    }

    public List<Booking> getAllBookings() {
        List<Spending> allSpendings = spendingRepository.findAll();
        List<Booking> allBookings = new ArrayList<>();
        for (Spending spending: allSpendings) {
            allBookings.addAll(spending.getBookings());
        }
        return allBookings;
    }

}
