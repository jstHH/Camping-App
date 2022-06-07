package com.example.backend.controller;

import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.service.TentItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/tents")
public class TentController {

    private final TentItemService tentItemService;

    public TentController(TentItemService tentItemService) {
        this.tentItemService = tentItemService;
    }

    @GetMapping
    public List<TentItem> getTentItems () {
        return tentItemService.getTentItems();
    }

    @GetMapping("{id}")
    public TentItem getTentItemByID (@PathVariable String id) {
        return tentItemService.getTentItemByID(id);
    }

    @PostMapping
    public TentItem addTentItem (@RequestBody TentItemDTO newTentItem) {
        return tentItemService.addTentItem(newTentItem);
    }
}
