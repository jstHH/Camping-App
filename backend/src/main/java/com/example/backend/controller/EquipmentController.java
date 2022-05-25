package com.example.backend.controller;

import com.example.backend.dto.EquipmentItemDTO;
import com.example.backend.model.EquipmentItem;
import com.example.backend.service.EquipmentItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/equipment")
public class EquipmentController {
    public final EquipmentItemService equipmentItemsService;

    @Autowired
    public EquipmentController(EquipmentItemService equipmentItemsService) {
        this.equipmentItemsService = equipmentItemsService;
    }

    @GetMapping
    public List<EquipmentItem> getEquipmentItems() {
        return equipmentItemsService.getEquipmentItems();
    }

    @GetMapping("{id}")
    public EquipmentItem getEquipmentItemByID(@PathVariable String id) {
        return equipmentItemsService.getEquipmentItemByID(id);
    }

    @PostMapping
    public EquipmentItem addEquipmentItem(@RequestBody EquipmentItemDTO equipmentItemDTO) {
        return equipmentItemsService.addEquipmentItem(equipmentItemDTO);

    }

}
