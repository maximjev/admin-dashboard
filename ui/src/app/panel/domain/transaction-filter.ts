export class TransactionFilter {
  constructor(
    public id: string,
    public name: string,
    public from: Date,
    public to: Date) {}
}
