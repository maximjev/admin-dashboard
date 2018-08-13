package com.transaction.backend.entity;


import com.transaction.backend.repo.helpers.LocalDateTimeConverter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "transaction_name", nullable = false)
    private String name;

    @Column(name = "transaction_type", nullable = false)
    private TransactionType type;

    @Column(name = "created_on")
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime createdOn;


    @Column(name = "changed_on")
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime changedOn;

    public enum TransactionType {
        AUTHORIZE,
        SALE_VOID
    }

    public Transaction() {
    }

    public Transaction(String name, TransactionType type) {
        this.name = name;
        this.type = type;
        this.createdOn = LocalDateTime.now();
    }

    public void update(Transaction newTransaction) {
        this.name = newTransaction.getName();
        this.type = newTransaction.getType();
        this.changedOn = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getChangedOn() {
        return changedOn;
    }
}
