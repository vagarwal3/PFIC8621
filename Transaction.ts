import { Date } from "./Date";
export enum TransactionType {
    Purchase,
    Dispose
}
export class Transaction {
    ReferenceIDNumber: string;
    FundName: string;
    TransactionType: TransactionType;
    Date: Date;
    NumberOfUnits: number;
    Amount: number;
    constructor(referenceIDNumber: string, fundName: string, transactionType: TransactionType, date: Date, numberOfUnits: number, amount: number) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.TransactionType = transactionType;
        this.Date = date;
        this.NumberOfUnits = numberOfUnits;
        this.Amount = amount;
    }
}