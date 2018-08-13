package com.transaction.backend;

import com.transaction.backend.entity.Transaction;
import com.transaction.backend.entity.User;
import com.transaction.backend.repo.TransactionRepository;
import com.transaction.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        userRepository.save(new User("admin",
                passwordEncoder.encode("123"),
                "clifton.ayotunde@lcelander.com",
                User.UserRole.ROLE_ADMIN));

        List<Transaction> transactionList = new ArrayList<>();
        transactionList.add(new Transaction("name 1", Transaction.TransactionType.AUTHORIZE));
        transactionList.add(new Transaction("name 2", Transaction.TransactionType.AUTHORIZE));
        transactionList.add(new Transaction("name 3", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 4", Transaction.TransactionType.AUTHORIZE));
        transactionList.add(new Transaction("name 5", Transaction.TransactionType.AUTHORIZE));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionList.add(new Transaction("name 6", Transaction.TransactionType.SALE_VOID));
        transactionRepository.saveAll(transactionList);
    }
}
