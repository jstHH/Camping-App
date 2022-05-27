package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "equipmentItems")
public class EquipmentItem extends Item{

    @Id
    private String id;
    boolean important;
    boolean done;

    @Builder
    public EquipmentItem(String title, String description, String owner, List<String> involved, String spending, String id, boolean isImportant, boolean isDone) {
        super(title, description, owner, involved, spending);
        this.id = id;
        this.important = isImportant;
        this.done = isDone;
    }
}
