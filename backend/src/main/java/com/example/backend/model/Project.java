package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "project")
@Builder
public class Project {
    @Id
    private String id;
    private String title;
    private String description;
    private String date;
    private String location;
    private Link[] links;
}
