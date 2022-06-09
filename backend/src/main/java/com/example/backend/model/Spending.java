package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Data
@Document(collection = "spendings")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Spending {
    @Id
    private String id;
    private String title;
    private String itemID;
    private String owner;
    private List<String> involved;
    private BigDecimal amount;
    private List<Booking> bookings;
}
