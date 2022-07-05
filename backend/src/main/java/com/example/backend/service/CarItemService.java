package com.example.backend.service;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.dto.SpendingItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.repository.CarItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CarItemService {
    private final CarItemRepository carItemRepository;
    private final SpendingService spendingService;
    private final AppUserDataService appUserDataService;

    @Autowired
    public CarItemService(CarItemRepository carItemRepository, SpendingService spendingService, AppUserDataService appUserDataService) {
        this.carItemRepository = carItemRepository;
        this.spendingService = spendingService;
        this.appUserDataService = appUserDataService;
    }

    public List<CarItem> getCarItems() {
        return carItemRepository.findAll();
    }

    public CarItem addCarItem(CarItemDTO carItemDTO) {
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
        setUserCarStatus();
        return carItemRepository.insert(newCarItem);
    }

    public CarItem getCarItemByID(String id) {
        return carItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Car with id " + id + " not found"));
    }

    public CarItem updateCarItem(String id, CarItemDTO carItemDTO) {
        SpendingItemDTO changedSpending = SpendingItemDTO.builder()
                .title(carItemDTO.getTitle())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .build();

        CarItem changedCarItem = carItemRepository.save(CarItem.builder()
                .id(id)
                .title(carItemDTO.getTitle())
                .description(carItemDTO.getDescription())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .spending(spendingService.updateSpending(carItemDTO.getSpending(), changedSpending))
                .capacity(carItemDTO.getCapacity())
                .trailer(carItemDTO.isTrailer())
                .startLocation(carItemDTO.getStartLocation())
                .build());

        setUserCarStatus();
        return changedCarItem;
    }

    public String deleteCarItem(String id) {
        if (carItemRepository.existsById(id)) {
            carItemRepository.deleteById(id);
            if (!carItemRepository.existsById(id)) {
                setUserCarStatus();
                return id;
            } else {
                return "Deletion failed";
            }
        }
        return "Item with Id " + id + " not found";
    }

    public List<String> getUserWithCarIDs() {
        List<CarItem> allCarItems = carItemRepository.findAll();
        List<String> userWithCarIDs = new ArrayList<>();
        for (CarItem car : allCarItems) {
            userWithCarIDs.add(car.getOwner());
            userWithCarIDs.addAll(car.getInvolved());
        }
        return userWithCarIDs.stream().distinct().toList();
    }

    public void setUserCarStatus () {
        appUserDataService.setUserCarTentStatus(getUserWithCarIDs(), "car");
    }

}
