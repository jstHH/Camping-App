package com.example.backend.service;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public EquipmentItem getEquipmentItemByID(String id) {
        return equipmentItemRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public EquipmentItem addEquipmentItem(EquipmentItemDTO equipmentItemDTO) {
        return equipmentItemRepository.insert(EquipmentItem.builder()
                .title(equipmentItemDTO.getTitle())
                .description(equipmentItemDTO.getDescription())
                .owner(equipmentItemDTO.getOwner())
                .build());

    }

    public EquipmentItem updateEquipmentItem(EquipmentItemDTO equipmentItemDTO, String id) {
        return equipmentItemRepository.save(EquipmentItem.builder()
                .title(equipmentItemDTO.getTitle())
                .description(equipmentItemDTO.getDescription())
                .owner(equipmentItemDTO.getOwner())
                .involved(equipmentItemDTO.getInvolved())
                .spending(equipmentItemDTO.getSpending())
                .id(id)
                .important(equipmentItemDTO.isImportant())
                .done(equipmentItemDTO.isDone())
                .build());
    }
}
