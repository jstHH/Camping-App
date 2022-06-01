package com.example.backend.repository;

import com.example.backend.model.CarItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarItemRepository extends MongoRepository<CarItem, String> {
}
