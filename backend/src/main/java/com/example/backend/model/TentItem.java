package com.example.backend.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tentItems")
public class TentItem extends Item{

    @Id
    private String id;
    private int capacity;
    private boolean shelter;

    @Builder
    public TentItem(String title, String description, String owner, List<String> involved, String spending, String id, int capacity, boolean shelter) {
        super(title, description, owner, involved, spending);
        this.id = id;
        this.capacity = capacity;
        this.shelter = shelter;
    }
}
