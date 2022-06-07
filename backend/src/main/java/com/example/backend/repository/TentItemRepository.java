package com.example.backend.repository;

import com.example.backend.model.TentItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TentItemRepository extends MongoRepository<TentItem, String> {
}
