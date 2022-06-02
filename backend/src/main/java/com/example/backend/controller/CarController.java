package com.example.backend.controller;

import com.example.backend.dto.CarItemDTO;
import com.example.backend.model.CarItem;
import com.example.backend.service.CarItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/cars")
public class CarController {
    public final CarItemService carItemService;

    @Autowired
    public CarController(CarItemService carItemService) {
        this.carItemService = carItemService;
    }

    @GetMapping
    public List<CarItem> getCarItems () {
        return carItemService.getCarItems();
    }

    @PostMapping
    public CarItem addCarItem (@RequestBody CarItemDTO carItemDTO) {
        return carItemService.addCarItem(carItemDTO);
    }
}
