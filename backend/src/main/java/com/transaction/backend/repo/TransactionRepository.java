package com.transaction.backend.repo;

import com.transaction.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TransactionRepository extends CrudRepository<Transaction, Integer>, JpaSpecificationExecutor<Transaction> {
    Optional<Transaction> findByName(String name);
}
