package com.example.backend.security.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@With
@Document(collection = "appUsers")

public class AppUser {
    @Id
    private String id;
    private String login;
    private String password;
    private String name;
    private BigDecimal balance;
}
