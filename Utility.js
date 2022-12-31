"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InterestRate_json_1 = __importDefault(require("./InterestRate.json"));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Purchase"] = 0] = "Purchase";
    TransactionType[TransactionType["Dispose"] = 1] = "Dispose";
})(TransactionType || (TransactionType = {}));
class InterestCalculator {
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    daysInYear(year) {
        var days = 0;
        for (var month = 1; month <= 12; month++) {
            days += this.daysInMonth(month, year);
        }
        return days;
    }
    GetInterestRateOnADate(date) {
        let year = date.getFullYear();
        let monthIndex = date.getMonth();
        let quarter = monthIndex / 4;
        return InterestRate_json_1.default.find(x => x.Year == year).QuaterlyInterestRate[quarter];
    }
    CalculateInterest(startDate, endDate, amount) {
        let interestBasis = amount;
        let date = startDate;
        while (date <= endDate) {
            interestBasis += this.GetInterestRateOnADate(date) * interestBasis / this.daysInYear(date.getFullYear());
            date.setDate(date.getDate() + 1);
        }
        return interestBasis - amount;
    }
}
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
    USPersonSince;
    FundType;
    Transactions;
    constructor() {
        this.Transactions = [];
    }
}
class UnitBlockYearDetail {
    Year;
    NumberOfDays;
    Line16c;
    IsResident;
    constructor(year) {
        this.Year = year;
    }
}
class ReferenceIDYearDetail {
    Year;
    Line16cTotal;
    Interest;
    constructor(year, line16cTotal, taxYear) {
        this.Year = year;
        this.Line16cTotal = line16cTotal;
        let interestCalculator = new InterestCalculator();
        this.Interest = interestCalculator.CalculateInterest(new Date(year, 3, 15), new Date(taxYear, 3, 15), line16cTotal);
    }
}
class UnitBlock {
    NumberOfUnits;
    PurchaseDate;
    PurchaseAmount;
    DisposeDate;
    DisposeAmount;
    UnitBlockYearDetails;
    Line16B;
    constructor(taxYear, purchaseDate, purchaseAmount, disposeDate, disposeAmount) {
        this.UnitBlockYearDetails = [];
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfDays = 0;
        for (let year = purchaseYear; year <= disposeYear; year++) {
            let unitBlockYearDetail = new UnitBlockYearDetail(year);
            let holdingStartDateInYear;
            let holdingEndDateInYear;
            if (year == purchaseYear) {
                holdingStartDateInYear = purchaseDate;
            }
            else {
                holdingStartDateInYear = new Date(year, 0, 1);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = new Date(year, 11, 31);
            }
            let numberOfDays = 0;
            let day = holdingStartDateInYear;
            while (day < holdingEndDateInYear) {
                numberOfDays++;
                day.setDate(day.getDate() + 1);
            }
            unitBlockYearDetail.NumberOfDays = numberOfDays;
            totalNumberOfDays += numberOfDays;
            this.UnitBlockYearDetails.push(unitBlockYearDetail);
        }
        let profit = disposeAmount - purchaseAmount;
        this.UnitBlockYearDetails.forEach(unitBlockYearDetail => {
            let profitInYear = profit * unitBlockYearDetail.NumberOfDays / totalNumberOfDays;
            unitBlockYearDetail.Line16c = profit * unitBlockYearDetail.NumberOfDays / totalNumberOfDays;
            if (unitBlockYearDetail.Year == taxYear) {
                this.Line16B += profitInYear;
            }
            else {
                unitBlockYearDetail.Line16c = profitInYear;
            }
        });
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
    UnitBlocks;
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
    constructor() {
        this.ReferenceIDDetails = [];
    }
}
class Form8621Calculator {
    GetBlocks(transactions, taxYear) {
        let arrayUnitBlocks = [];
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
                                let unitBlock = new UnitBlock(taxYear, purchaseTransaction.Date, purchaseTransaction.Amount, transaction.Date, transaction.Amount);
                                if (remainingPurchaseUnitsInPurchaseTransaction >= UnitsToDispose) {
                                    unitBlock.NumberOfUnits = transaction.NumberOfUnits;
                                    purchaseTransactionUnitTuple[1] -= transaction.NumberOfUnits;
                                    UnitsToDispose = 0;
                                }
                                else {
                                    unitBlock.NumberOfUnits = remainingPurchaseUnitsInPurchaseTransaction;
                                    UnitsToDispose -= remainingPurchaseUnitsInPurchaseTransaction;
                                    purchaseTransactionUnitTuple[1] = 0;
                                }
                                unitBlock.PurchaseDate = purchaseTransaction.Date;
                                unitBlock.PurchaseAmount = unitBlock.NumberOfUnits * purchaseTransaction.Amount / purchaseTransaction.NumberOfUnits;
                                unitBlock.DisposeDate = transaction.Date;
                                unitBlock.DisposeAmount = unitBlock.NumberOfUnits * transaction.Amount / transaction.NumberOfUnits;
                                arrayUnitBlocks.push(unitBlock);
                            }
                        }
                    });
                }
            }
        });
        return arrayUnitBlocks;
    }
    GetTaxRateByYear(year) {
        switch (year) {
            case 1987:
                return 38.5;
            case 1988:
            case 1989:
            case 1990:
                return 28;
            case 1991:
            case 1992:
                return 31;
            case 1993:
            case 1994:
            case 1995:
            case 1996:
            case 1997:
            case 1998:
            case 1999:
            case 2000:
                return 39.6;
            case 2001:
                return 39.1;
            case 2002:
                return 38.6;
            case 2003:
            case 2004:
            case 2005:
            case 2006:
            case 2007:
            case 2008:
            case 2009:
            case 2010:
            case 2011:
            case 2012:
                return 35;
            case 2013:
            case 2014:
            case 2015:
            case 2016:
            case 2017:
                return 39.6;
            case 2018:
            case 2019:
            case 2020:
            case 2021:
            case 2022:
                return 37;
        }
    }
    Compile(input) {
        let result = new Output8621();
        result.TaxYear = input.TaxYear;
        let lstReferenceIDNumbers = [];
        input.Transactions.forEach(transaction => {
            if (!lstReferenceIDNumbers.includes(transaction.ReferenceIDNumber)) {
                lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
            }
        });
        lstReferenceIDNumbers.forEach(referenceIDNumber => {
            let lstTransactions = input.Transactions.filter((t) => t.ReferenceIDNumber == referenceIDNumber);
            let referenceIDDetail = new ReferenceIDDetail(referenceIDNumber, lstTransactions[0].FundName);
            referenceIDDetail.UnitBlocks = this.GetBlocks(lstTransactions, input.TaxYear);
            referenceIDDetail.PurchaseTotal = referenceIDDetail.UnitBlocks.reduce((sum, block) => sum + block.PurchaseAmount, 0);
            referenceIDDetail.DisposeTotal = referenceIDDetail.UnitBlocks.reduce((sum, block) => sum + block.DisposeAmount, 0);
            let totalInterest = 0;
            console.log(referenceIDDetail.UnitBlocks);
            referenceIDDetail.UnitBlocks[0].UnitBlockYearDetails.forEach(unitBlockYearDetail => {
                let year = unitBlockYearDetail.Year;
                let line16cSum = referenceIDDetail.UnitBlocks.reduce((sum, unitBlock) => sum + unitBlock.UnitBlockYearDetails.find(x => x.Year == year).Line16c, 0);
                let referenceIDYearDetail = new ReferenceIDYearDetail(year, line16cSum, input.TaxYear);
                totalInterest += referenceIDYearDetail.Interest;
                referenceIDDetail.ExcessDistributionSummary.Line16c += line16cSum * this.GetTaxRateByYear(year);
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
function Test() {
    let input = new Input8621();
    let calculator = new Form8621Calculator();
    input.TaxYear = 2022;
    input.USPersonSince = -1;
    input.FundType = FundType.Section1291;
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Purchase, new Date('12/12/2021'), 100, 50));
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Dispose, new Date('12/12/2022'), 30, 150.33));
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Dispose, new Date('12/15/2022'), 60, 80.33));
    let result = calculator.Compile(input);
    console.info(result.ReferenceIDDetails[0].UnitBlocks[0]);
}
Test();
//# sourceMappingURL=Utility.js.map