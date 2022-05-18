package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Item {
    private String id;
    private String title;
    private String description;
    private String owner;
    private List<String> involved;
    private String spending;

}
