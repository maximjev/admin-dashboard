import {TransactionType} from "./transaction-type";

export class Transaction {
  constructor(
    public id: string,
    public name: string,
    public type: TransactionType,
    public createdOn: Date
  ) {}
}
