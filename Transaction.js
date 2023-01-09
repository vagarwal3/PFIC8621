"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Purchase"] = 0] = "Purchase";
    TransactionType[TransactionType["Dispose"] = 1] = "Dispose";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
class Transaction {
    ReferenceIDNumber;
    FundName;
    TransactionType;
    Date;
    NumberOfUnits;
    Amount;
    constructor(referenceIDNumber, fundName, transactionType, date, numberOfUnits, amount) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.TransactionType = transactionType;
        this.Date = date;
        this.NumberOfUnits = numberOfUnits;
        this.Amount = amount;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map