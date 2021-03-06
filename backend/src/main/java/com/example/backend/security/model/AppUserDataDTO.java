package com.example.backend.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppUserDataDTO {
    private String id;
    private String login;
    private String name;
    private BigDecimal balance;
    private boolean tent;
    private boolean car;
}
