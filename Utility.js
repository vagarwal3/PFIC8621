"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const InterestCalculator_1 = require("./InterestCalculator");
const TaxRate_1 = require("./TaxRate");
const ShareBlock_1 = require("./ShareBlock");
class Utility {
    static ConvertNumberTo2DecimalPlace(amount) {
        return parseFloat(amount.toFixed(2));
    }
}
exports.Utility = Utility;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Purchase"] = 0] = "Purchase";
    TransactionType[TransactionType["Dispose"] = 1] = "Dispose";
})(TransactionType || (TransactionType = {}));
var FundType;
(function (FundType) {
    FundType[FundType["Section1291"] = 0] = "Section1291";
})(FundType || (FundType = {}));
class Transaction {
    constructor(referenceIDNumber, fundName, transactionType, date, numberOfUnits, amount) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.TransactionType = transactionType;
        this.Date = date;
        this.NumberOfUnits = numberOfUnits;
        this.Amount = amount;
    }
    ReferenceIDNumber;
    FundName;
    TransactionType;
    Date;
    NumberOfUnits;
    Amount;
}
class Input8621 {
    TaxYear;
    USPersonSinceBirth;
    USPersonSinceYear;
    FundType;
    Transactions;
    constructor() {
        this.Transactions = [];
    }
}
class ReferenceIDYearDetail {
    Year;
    Line16cTotal;
    Interest;
    constructor(year, line16cTotal, taxYear) {
        this.Year = year;
        this.Line16cTotal = line16cTotal;
        let interestCalculator = new InterestCalculator_1.InterestCalculator();
        this.Interest = interestCalculator.CalculateInterest(new Date(year, 3, 15), new Date(taxYear, 3, 15), line16cTotal);
    }
}
class ExcessDistributionSummary {
    Line15f;
    Line16b;
    Line16c;
    Line16d;
    Line16e;
    Line16f;
    constructor() {
        this.Line15f = 0;
        this.Line16b = 0;
        this.Line16c = 0;
        this.Line16d = 0;
        this.Line16e = 0;
        this.Line16f = 0;
    }
}
class ReferenceIDDetail {
    ReferenceIDNumber;
    FundName;
    ShareBlocks;
    PurchaseTotal;
    DisposeTotal;
    Line16bTotal;
    ReferenceIDYearDetail;
    ExcessDistributionSummary;
    constructor(referenceIDNumber, fundName) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.ReferenceIDYearDetail = [];
        this.ExcessDistributionSummary = new ExcessDistributionSummary();
    }
}
class Output8621 {
    TaxYear;
    ReferenceIDDetails;
    constructor(taxYear) {
        this.TaxYear = taxYear;
        this.ReferenceIDDetails = [];
    }
}
class Form8621Calculator {
    GetShareBlocks(transactions, taxYear) {
        let arrayShareBlocks = [];
        let PurchaseTransactions = [];
        transactions.sort().forEach(transaction => {
            if (transaction.TransactionType == TransactionType.Purchase) {
                PurchaseTransactions.push([transaction, transaction.NumberOfUnits]);
            }
            else {
                let UnitsToDispose = transaction.NumberOfUnits;
                if (transaction.Date.getFullYear() == taxYear) {
                    PurchaseTransactions.forEach(purchaseTransactionUnitTuple => {
                        if (UnitsToDispose > 0) {
                            let purchaseTransaction = purchaseTransactionUnitTuple[0];
                            let remainingPurchaseUnitsInPurchaseTransaction = purchaseTransactionUnitTuple[1];
                            if (remainingPurchaseUnitsInPurchaseTransaction > 0) {
                                let numberOfUnitsInBlock;
                                if (remainingPurchaseUnitsInPurchaseTransaction >= UnitsToDispose) {
                                    numberOfUnitsInBlock = transaction.NumberOfUnits;
                                    purchaseTransactionUnitTuple[1] -= transaction.NumberOfUnits;
                                    UnitsToDispose = 0;
                                }
                                else {
                                    numberOfUnitsInBlock = remainingPurchaseUnitsInPurchaseTransaction;
                                    UnitsToDispose -= remainingPurchaseUnitsInPurchaseTransaction;
                                    purchaseTransactionUnitTuple[1] = 0;
                                }
                                let blockPurchaseAmount = numberOfUnitsInBlock * purchaseTransaction.Amount / purchaseTransaction.NumberOfUnits;
                                let blockDisposeAmount = numberOfUnitsInBlock * transaction.Amount / transaction.NumberOfUnits;
                                let shareBlock = new ShareBlock_1.ShareBlock(taxYear, true, null, numberOfUnitsInBlock, purchaseTransaction.Date, blockPurchaseAmount, transaction.Date, blockDisposeAmount);
                                arrayShareBlocks.push(shareBlock);
                            }
                        }
                    });
                }
            }
        });
        return arrayShareBlocks;
    }
    GetUniqueReferenceIDNumbers(transactions) {
        let lstReferenceIDNumbers = [];
        transactions.forEach(transaction => {
            if (!lstReferenceIDNumbers.includes(transaction.ReferenceIDNumber)) {
                lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
            }
        });
        return lstReferenceIDNumbers;
    }
    Audit(input) {
    }
    Compute(input) {
        let result = new Output8621(input.TaxYear);
        let lstReferenceIDNumbers = this.GetUniqueReferenceIDNumbers(input.Transactions);
        lstReferenceIDNumbers.forEach(referenceIDNumber => {
            let lstTransactions = input.Transactions.filter((t) => t.ReferenceIDNumber == referenceIDNumber);
            let referenceIDDetail = new ReferenceIDDetail(referenceIDNumber, lstTransactions[0].FundName);
            referenceIDDetail.ShareBlocks = this.GetShareBlocks(lstTransactions, input.TaxYear);
            referenceIDDetail.PurchaseTotal = referenceIDDetail.ShareBlocks.reduce((sum, block) => sum + block.PurchaseAmount, 0);
            referenceIDDetail.DisposeTotal = referenceIDDetail.ShareBlocks.reduce((sum, block) => sum + block.DisposeAmount, 0);
            let totalInterest = 0;
            let taxRateCalculator = new TaxRate_1.TaxRate();
            referenceIDDetail.ShareBlocks[0].ShareBlockYearDetails.forEach(shareBlockYearDetail => {
                let year = shareBlockYearDetail.Year;
                let line16cSum = referenceIDDetail.ShareBlocks.reduce((sum, shareBlock) => sum + shareBlock.ShareBlockYearDetails.find(x => x.Year == year).GetLine16c(), 0);
                let referenceIDYearDetail = new ReferenceIDYearDetail(year, line16cSum, input.TaxYear);
                totalInterest += referenceIDYearDetail.Interest;
                referenceIDDetail.ExcessDistributionSummary.Line16c += line16cSum * taxRateCalculator.GetTaxRateByYear(year);
                referenceIDDetail.ReferenceIDYearDetail.push(referenceIDYearDetail);
            });
            referenceIDDetail.ExcessDistributionSummary.Line16c = referenceIDDetail.DisposeTotal - referenceIDDetail.PurchaseTotal;
            referenceIDDetail.ExcessDistributionSummary.Line16e = referenceIDDetail.ExcessDistributionSummary.Line16c;
            referenceIDDetail.ExcessDistributionSummary.Line16f = totalInterest;
            result.ReferenceIDDetails.push(referenceIDDetail);
        });
        return result;
    }
}
//# sourceMappingURL=Utility.js.map