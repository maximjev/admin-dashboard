package com.transaction.backend.restapi;

import com.transaction.backend.entity.Transaction;
import com.transaction.backend.entity.TransactionExcelEntry;
import com.transaction.backend.mapper.TransactionMapper;
import com.transaction.backend.repo.TransactionRepository;
import com.transaction.backend.repo.TransactionSearchRepository;
import com.transaction.backend.restapi.dto.TransactionDTO;
import com.transaction.backend.restapi.dto.TransactionFilterDTO;
import org.jxls.template.SimpleExporter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/transactions")
public class TransactionController {


    private static final Logger LOG = LoggerFactory.getLogger(TransactionController.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionSearchRepository searchRepository;

    @Autowired
    private TransactionMapper mapper;

    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        return transactionRepository
                .findById(Integer.parseInt(id))
                .map(mapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> notFound().build());
    }

    @PostMapping("{id}")
    public ResponseEntity<?> save(@PathVariable String id, @RequestBody TransactionDTO transactionDTO) {
        return transactionRepository
                .findById(Integer.parseInt(id))
                .map(transaction -> {
                    transaction.update(mapper.map(transactionDTO));
                    transactionRepository.save(transaction);
                    return transaction;
                })
                .map(ResponseEntity::ok).orElseGet(() -> notFound().build());
    }

    @GetMapping
    public Page<TransactionDTO> find(TransactionFilterDTO filter, Pageable page) {
        return searchRepository
                .findTransactionsByFilter(mapper.toFilter(filter), page)
                .map(mapper::toDTO);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TransactionDTO dto) {
        if(transactionRepository.findByName(dto.getName()).isPresent()) {
            return new ResponseEntity<>("TRANSACTION_EXISTS", HttpStatus.BAD_REQUEST);
        }
        transactionRepository.save(new Transaction(dto.getName(), dto.getType()));
        return ok().build();
    }

    @GetMapping("types")
    public ResponseEntity<?> getTypes() {
        return ok(Transaction.TransactionType.values());
    }

    @GetMapping("export")
    public void export(HttpServletResponse response) {
        List<Transaction> transactions = (List<Transaction>) transactionRepository.findAll();
        List<TransactionExcelEntry> entries = transactions.stream().map(mapper::toExcel).collect(Collectors.toList());

        List<String> headers = Arrays.asList("Id", "Name", "Type", "Created On");
        try {
            response.addHeader("Content-disposition", "attachment; filename=Transactions.xlsx");
            response.setContentType("application/vnd.ms-excel");
            new SimpleExporter().gridExport(headers, entries, "id, name, type, createdOn", response.getOutputStream());
            response.flushBuffer();

        } catch (IOException ex) {
            LOG.debug("parsing of transactions failed");
        }
    }
}
