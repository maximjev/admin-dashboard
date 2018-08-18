import {Pipe, PipeTransform} from "@angular/core";
import {TransactionType} from "../domain/transaction-type";


@Pipe({name: 'formatType'})
export class FormatTypePipe implements PipeTransform{
  transform(value: TransactionType, args?: any): any {
    if (value == null) {
      return ''
    }

    switch (value) {
      case TransactionType.AUTHORIZE:
        return 'Authorize';
      case TransactionType.SALE_VOID:
        return 'Sale void';
      default:
        throw new Error('Undefined TransactionType: ' + value)
    }
  }
}
