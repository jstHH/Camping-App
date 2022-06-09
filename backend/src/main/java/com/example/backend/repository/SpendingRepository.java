package com.example.backend.repository;

import com.example.backend.model.Spending;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SpendingRepository extends MongoRepository<Spending, String> {
}
