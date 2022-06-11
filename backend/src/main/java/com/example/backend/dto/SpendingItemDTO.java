package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpendingItemDTO {
    private String title;
    private String itemID;
    private String itemClass;
    private String owner;
    private List<String> involved;
    private BigDecimal amount;
}
