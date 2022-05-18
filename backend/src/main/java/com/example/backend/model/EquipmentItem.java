package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "equipmentItems")
public class EquipmentItem extends Item{
    boolean isImportant;
    boolean isDone;

    @Builder
    public EquipmentItem(String id, String title, String description, String owner, List<String> involved, String spending, boolean isImportant, boolean isDone) {
        super(id, title, description, owner, involved, spending);
        this.isImportant = isImportant;
        this.isDone = isDone;
    }
}
