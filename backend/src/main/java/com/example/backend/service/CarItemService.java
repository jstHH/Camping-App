package com.example.backend.service;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.repository.CarItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CarItemService {
    private final CarItemRepository carItemRepository;
    private final SpendingService spendingService;

    @Autowired
    public CarItemService(CarItemRepository carItemRepository, SpendingService spendingService) {
        this.carItemRepository = carItemRepository;
        this.spendingService = spendingService;
    }

    public List<CarItem> getCarItems () {
        return carItemRepository.findAll();
    }

    public CarItem addCarItem (CarItemDTO carItemDTO) {
        CarItem newCarItem = CarItem.builder()
                .title(carItemDTO.getTitle())
                .description(carItemDTO.getDescription())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .spending(carItemDTO.getSpending())
                .capacity(carItemDTO.getCapacity())
                .trailer(carItemDTO.isTrailer())
                .startLocation(carItemDTO.getStartLocation())
                .build();

        return carItemRepository.insert(newCarItem);
    }

    public CarItem getCarItemByID (String id) {
        return carItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Car with id " + id + " not found"));
    }

    public CarItem updateCarItem (String id, CarItemDTO carItemDTO) {
        SpendingItemDTO changedSpending = SpendingItemDTO.builder()
                .title(carItemDTO.getTitle())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .build();

        return carItemRepository.save(CarItem.builder()
                .id(id)
                .title(carItemDTO.getTitle())
                .description(carItemDTO.getDescription())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .spending(!carItemDTO.getSpending().equals("")
                        ? spendingService.updateSpending(carItemDTO.getSpending(), changedSpending)
                        : carItemDTO.getSpending())
                .capacity(carItemDTO.getCapacity())
                .trailer(carItemDTO.isTrailer())
                .startLocation(carItemDTO.getStartLocation())
                .build());
    }

    public String deleteCarItem(String id) {
        if (carItemRepository.existsById(id)) {
            carItemRepository.deleteById(id);
            if (!carItemRepository.existsById(id)) {
                return id;
            } else {
                return "Deletion failed";
            }
        }
        return "Item with Id " + id + " not found";
    }

}
