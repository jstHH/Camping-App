package com.example.backend.security.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@With
@Document(collection = "appUsers")

public class AppUser {
    @Id
    String id;
    String login;
    String password;
    String name;
    double balance;
}
