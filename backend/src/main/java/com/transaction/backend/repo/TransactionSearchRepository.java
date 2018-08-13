package com.transaction.backend.repo;

import com.transaction.backend.entity.Transaction;
import com.transaction.backend.repo.helpers.TransactionFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface TransactionSearchRepository {

    Page<Transaction> findTransactionsByFilter(TransactionFilter filter, Pageable page);
}
