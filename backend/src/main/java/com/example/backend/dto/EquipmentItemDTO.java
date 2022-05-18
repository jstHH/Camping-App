package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EquipmentItemDTO {
    private String id;
    private String title;
    private String description;
    private String owner;
    private ArrayList<String> involved;
    private String spending;
    boolean isImportant;
    boolean isDone;
}
