package com.example.backend.controller;

import com.example.backend.model.TentItem;
import com.example.backend.service.TentItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
