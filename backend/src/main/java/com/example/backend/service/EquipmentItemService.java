package com.example.backend.service;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.repository.EquipmentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EquipmentItemService {
    private final EquipmentItemRepository equipmentItemRepository;
    private final SpendingService spendingService;

    @Autowired
    public EquipmentItemService(EquipmentItemRepository equipmentItemRepository, SpendingService spendingService) {
        this.equipmentItemRepository = equipmentItemRepository;
        this.spendingService = spendingService;
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
                .spending("")
                .build());

    }

    public EquipmentItem updateEquipmentItem(EquipmentItemDTO equipmentItemDTO, String id) {
        return equipmentItemRepository.save(EquipmentItem.builder()
                .title(equipmentItemDTO.getTitle())
                .description(equipmentItemDTO.getDescription())
                .owner(equipmentItemDTO.getOwner())
                .involved(equipmentItemDTO.getInvolved())
                .spending(spendingService.updateSpending(equipmentItemDTO.getSpending(), SpendingItemDTO.builder()
                        .title(equipmentItemDTO.getTitle())
                        .owner(equipmentItemDTO.getOwner())
                        .involved(equipmentItemDTO.getInvolved())
                        .build()))
                .id(id)
                .important(equipmentItemDTO.isImportant())
                .done(equipmentItemDTO.isDone())
                .build());
    }

    public String deleteEquipmentItem(String id) {
        if (equipmentItemRepository.findById(id).isPresent()) {
            equipmentItemRepository.deleteById(id);
            if (equipmentItemRepository.findById(id).isEmpty()) {
                return id;
            } else {
                return "Deletion failed";
            }
        }
        return "Item with Id " + id + " not found";
    }
}
