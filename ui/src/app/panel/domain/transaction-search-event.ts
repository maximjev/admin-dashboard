import {TransactionFilter} from "./transaction-filter";

export class TransactionSearchEvent {
  constructor(
    public filter: TransactionFilter,
    public page: number,
    public size: number
  ) {}
}
