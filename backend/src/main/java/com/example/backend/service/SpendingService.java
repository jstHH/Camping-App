package com.example.backend.service;


import com.example.backend.model.Spending;
import com.example.backend.repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
