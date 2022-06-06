package com.example.backend.service;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.repository.CarItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CarItemService {
    private final CarItemRepository carItemRepository;

    @Autowired
    public CarItemService(CarItemRepository carItemRepository) {
        this.carItemRepository = carItemRepository;
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
        return carItemRepository.save(CarItem.builder()
                .id(id)
                .title(carItemDTO.getTitle())
                .description(carItemDTO.getDescription())
                .owner(carItemDTO.getOwner())
                .involved(carItemDTO.getInvolved())
                .spending(carItemDTO.getSpending())
                .capacity(carItemDTO.getCapacity())
                .trailer(carItemDTO.isTrailer())
                .startLocation(carItemDTO.getStartLocation())
                .build());
    }

}
