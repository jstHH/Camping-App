package com.example.backend.service;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentItemService {
    private final EquipmentItemRepository equipmentItemRepository;

    @Autowired
    public EquipmentItemService(EquipmentItemRepository equipmentItemRepository) {
        this.equipmentItemRepository = equipmentItemRepository;
    }

    public List<EquipmentItem> getEquipmentItems() {
        return equipmentItemRepository.findAll();
    }

    public EquipmentItem addEquipmentItem(EquipmentItemDTO equipmentItemDTO) {
        return equipmentItemRepository.save(EquipmentItem.builder()
                .title(equipmentItemDTO.getTitle())
                .description(equipmentItemDTO.getDescription())
                .owner(equipmentItemDTO.getOwner())
                .build());

    }
}
