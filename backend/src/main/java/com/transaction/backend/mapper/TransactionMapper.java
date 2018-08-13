package com.transaction.backend.mapper;


import com.transaction.backend.config.BaseMapperConfig;
import com.transaction.backend.entity.Transaction;
import com.transaction.backend.entity.TransactionExcelEntry;
import com.transaction.backend.repo.helpers.TransactionFilter;
import com.transaction.backend.restapi.dto.TransactionDTO;
import com.transaction.backend.restapi.dto.TransactionFilterDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class)
public interface TransactionMapper {

    TransactionDTO toDTO(Transaction transaction);

    Transaction map(TransactionDTO transactionDTO);

    TransactionFilter toFilter(TransactionFilterDTO dto);

    TransactionExcelEntry toExcel(Transaction transaction);
}
