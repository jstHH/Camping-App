package com.example.backend.controller;

import com.example.backend.dto.TentItemDTO;
import com.example.backend.model.TentItem;
import com.example.backend.service.TentItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/tents")
public class TentItemController {

    private final TentItemService tentItemService;

    public TentItemController(TentItemService tentItemService) {
        this.tentItemService = tentItemService;
    }

    @GetMapping
    public List<TentItem> getTentItems () {
        return tentItemService.getTentItems();
    }

    @PostMapping
    public TentItem addTentItem (@RequestBody TentItemDTO newTentItem) {
        return tentItemService.addTentItem(newTentItem);
    }
}
