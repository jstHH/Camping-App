package com.example.backend.service;


import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.repository.TentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TentItemService {

    private final TentItemRepository tentItemRepository;

    @Autowired
    public TentItemService(TentItemRepository tentItemRepository) {
        this.tentItemRepository = tentItemRepository;
    }

    public List<TentItem> getTentItems() {
        return tentItemRepository.findAll();
    }

    public TentItem getTentItemByID(String id) {
        return tentItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Item not found"));
    }

    public TentItem addTentItem(TentItemDTO newTentItem) {
        return tentItemRepository.insert(TentItem.builder()
                .title(newTentItem.getTitle())
                .description(newTentItem.getDescription())
                .owner(newTentItem.getOwner())
                .involved(newTentItem.getInvolved())
                .spending(newTentItem.getSpending())
                .capacity(newTentItem.getCapacity())
                .shelter(newTentItem.isShelter())
                .build());
    }

    public TentItem updateTentItem(String id, TentItemDTO changedTentItem) {
        return tentItemRepository.save(TentItem.builder()
                .id(id)
                .title(changedTentItem.getTitle())
                .description(changedTentItem.getDescription())
                .owner(changedTentItem.getOwner())
                .involved(changedTentItem.getInvolved())
                .spending(changedTentItem.getSpending())
                .capacity(changedTentItem.getCapacity())
                .shelter(changedTentItem.isShelter())
                .build());
    }

    public String deleteTentItem(String id) {
        if (tentItemRepository.existsById(id)) {
            tentItemRepository.deleteById(id);
            if (tentItemRepository.existsById(id)) {
                return "Deletion failed";
            } else {
                return id;
            }
        }
        return "Item with ID " + id + " not found.";
    }

}
