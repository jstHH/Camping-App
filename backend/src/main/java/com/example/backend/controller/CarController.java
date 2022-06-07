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

    @GetMapping("{id}")
    public CarItem getCarItemByID (@PathVariable String id) {
        return carItemService.getCarItemByID(id);
    }

    @PutMapping("{id}")
    public CarItem updateCarItem (@PathVariable String id, @RequestBody CarItemDTO carItemDTO) {
        return carItemService.updateCarItem(id, carItemDTO);
    }

    @DeleteMapping("{id}")
    public String deleteCarItem (@PathVariable String id) {
        return carItemService.deleteCarItem(id);
    }
}
