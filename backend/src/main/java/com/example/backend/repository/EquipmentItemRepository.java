package com.example.backend.repository;

import com.example.backend.model.EquipmentItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentItemRepository extends MongoRepository<EquipmentItem, String> {
}
