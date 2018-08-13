package com.transaction.backend.repo;

import com.transaction.backend.entity.Transaction;
import com.transaction.backend.repo.helpers.TransactionFilter;
import com.transaction.backend.repo.helpers.TransactionSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TransactionSearchRepositoryImpl implements TransactionSearchRepository {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionSpecification specification;

    @Override
    public Page<Transaction> findTransactionsByFilter(TransactionFilter filter, @Nullable Pageable page) {


        List<Transaction> transactions = transactionRepository
                .findAll(specification.getFilter(filter));

        int totalCount = transactions.size();

        if(page != null) {
           transactions = transactions
                   .stream()
                   .skip(page.getOffset())
                   .limit(page.getPageSize())
                   .collect(Collectors.toList());
        }

        return new PageImpl<>(transactions, page, totalCount);
    }
}
