package com.transaction.backend.repo.helpers;

import com.transaction.backend.entity.Transaction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Component
public class TransactionSpecification extends BaseSpecification<Transaction, TransactionFilter> {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public Specification<Transaction> getFilter(TransactionFilter request) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            criteriaQuery.distinct(true);
            return (idEquals(request.getId())
                    .or(nameContains(request.getName()))
                    .and(isBefore("createdOn", request.getTo()))
                    .and(isAfter("createdOn", request.getFrom())))
                    .toPredicate(root, criteriaQuery, criteriaBuilder);
        });
    }


    private Specification<Transaction> transactionAttributeContains(String attribute, String value) {
        return (root, query, cb) -> {
            if (value == null) {
                return null;
            }

            return cb.like(
                    cb.lower(root.get(attribute)),
                    containsLowerCase(value)
            );
        };
    }

    private Specification<Transaction> idEquals(Integer value) {
        return (root, query, cb) -> {
            if (value == null) {
                return null;
            }

            return cb.equal(
                    root.get("id"),
                    value);
        };
    }

    private Specification<Transaction> nameContains(String name) {
        return transactionAttributeContains("name", name);
    }

    private Specification<Transaction> isBefore(String attribute, LocalDateTime time) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (time == null) {
                return null;
            }

            return criteriaBuilder.lessThanOrEqualTo(
                    root.get(attribute),
                    time
            );
        };
    }

    private Specification<Transaction> isAfter(String attribute, LocalDateTime time) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (time == null) {
                return null;
            }

            return criteriaBuilder.greaterThanOrEqualTo(
                    root.get(attribute),
                    time
            );
        };
    }
}