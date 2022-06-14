package com.example.backend.controller;

import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.Spending;
import com.example.backend.service.SpendingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/spendings")
public class SpendingController {
    private final SpendingService spendingService;

    public SpendingController(SpendingService spendingService) {
        this.spendingService = spendingService;
    }

    @GetMapping
    public List<Spending> getSpendings() {
        return spendingService.getSpendings();
    }

    @PostMapping
    public Spending addSpending(@RequestBody SpendingItemDTO spendingItemDTO) {
        return spendingService.addSpending(spendingItemDTO);
    }

    @GetMapping("{id}")
    public Spending getSpendingByID(@PathVariable String id) {
        return spendingService.getSpendingByID(id);
    }

    @DeleteMapping("{id}")
    public String deleteSpendingByID(@PathVariable String id) {
        return spendingService.deleteSpendingByID(id);
    }

}
