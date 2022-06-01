package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "carItems")
public class CarItem extends Item{

    @Id
    private String id;
    private int capacity;
    private boolean trailer;
    private String startLocation;

    @Builder
    public CarItem(String title, String description, String owner, List<String> involved, String spending, String id, int capacity, boolean trailer, String startLocation) {
        super(title, description, owner, involved, spending);
        this.id = id;
        this.capacity = capacity;
        this.trailer = trailer;
        this.startLocation = startLocation;
    }
}
