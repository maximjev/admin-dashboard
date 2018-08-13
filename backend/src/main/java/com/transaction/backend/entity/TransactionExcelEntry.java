package com.transaction.backend.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TransactionExcelEntry {

    private String datePattern = "yyyy-MM-dd HH:mm:ss";

    private Integer id;

    private String name;

    private Transaction.TransactionType type;

    private LocalDateTime createdOn;

    public TransactionExcelEntry() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Transaction.TransactionType getType() {
        return type;
    }

    public void setType(Transaction.TransactionType type) {
        this.type = type;
    }

    public String getCreatedOn() {
        return createdOn.format(DateTimeFormatter.ofPattern(datePattern));
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }
}
