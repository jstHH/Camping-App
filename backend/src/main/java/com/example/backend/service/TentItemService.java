package com.example.backend.service;


import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.repository.TentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TentItemService {

    private final TentItemRepository tentItemRepository;
    private final SpendingService spendingService;
    private final AppUserDataService appUserDataService;

    @Autowired
    public TentItemService(TentItemRepository tentItemRepository, SpendingService spendingService, AppUserDataService appUserDataService) {
        this.tentItemRepository = tentItemRepository;
        this.spendingService = spendingService;
        this.appUserDataService = appUserDataService;
    }

    public List<TentItem> getTentItems() {
        return tentItemRepository.findAll();
    }

    public TentItem getTentItemByID(String id) {
        return tentItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Item not found"));
    }

    public TentItem addTentItem(TentItemDTO newTentItem) {
        TentItem addedTentItem = tentItemRepository.insert(TentItem.builder()
                .title(newTentItem.getTitle())
                .description(newTentItem.getDescription())
                .owner(newTentItem.getOwner())
                .involved(newTentItem.getInvolved())
                .spending(newTentItem.getSpending())
                .capacity(newTentItem.getCapacity())
                .shelter(newTentItem.isShelter())
                .build());
        setUserTentStatus();
        return addedTentItem;
    }

    public TentItem updateTentItem(String id, TentItemDTO changedTentItemDTO) {
        SpendingItemDTO changedSpending = SpendingItemDTO.builder()
                .title(changedTentItemDTO.getTitle())
                .owner(changedTentItemDTO.getOwner())
                .involved(changedTentItemDTO.getInvolved())
                .build();

        TentItem changedTentItem = tentItemRepository.save(TentItem.builder()
                .id(id)
                .title(changedTentItemDTO.getTitle())
                .description(changedTentItemDTO.getDescription())
                .owner(changedTentItemDTO.getOwner())
                .involved(changedTentItemDTO.getInvolved())
                .spending(spendingService.updateSpending(changedTentItemDTO.getSpending(), changedSpending))
                .capacity(changedTentItemDTO.getCapacity())
                .shelter(changedTentItemDTO.isShelter())
                .build());

        setUserTentStatus();
        return changedTentItem;
    }

    public String deleteTentItem(String id) {
        if (tentItemRepository.existsById(id)) {
            tentItemRepository.deleteById(id);
            if (tentItemRepository.existsById(id)) {
                return "Deletion failed";
            } else {
                setUserTentStatus();
                return id;
            }
        }
        return "Item with ID " + id + " not found.";
    }

    public List<String> getUserWithTentIDs() {
        List<TentItem> allTentItems = tentItemRepository.findAll();
        List<String> userWithTentIDs = new ArrayList<>();
        for (TentItem tent : allTentItems) {
            userWithTentIDs.add(tent.getOwner());
            userWithTentIDs.addAll(tent.getInvolved());
        }
        return userWithTentIDs.stream().distinct().toList();
    }

    public void setUserTentStatus () {
        appUserDataService.setUserCarTentStatus(getUserWithTentIDs(), "tent");
    }

}
