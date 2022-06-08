package com.example.backend.service;


import com.example.backend.model.TentItem;
import com.example.backend.repository.TentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
