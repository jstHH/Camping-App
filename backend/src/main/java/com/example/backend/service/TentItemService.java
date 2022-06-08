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

    public List<TentItem> getTentItems () {
        return tentItemRepository.findAll();
    }

    public TentItem getTentItemByID (String id) {
        return tentItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Item not found"));
    }

    public TentItem addTentItem (TentItemDTO newTentItem) {
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

}
