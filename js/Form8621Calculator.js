"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form8621Calculator = exports.PFIC = exports.ShareHoldingYear = exports.FundType = void 0;
const InterestCalculator_1 = require("./InterestCalculator");
const TaxRate_1 = require("./TaxRate");
const ShareBlock_1 = require("./ShareBlock");
const Transaction_1 = require("./Transaction");
const Form8621_1 = require("./Form8621");
const Date_1 = require("./Date");
const Utility_1 = require("./Utility");
var FundType;
(function (FundType) {
    FundType[FundType["Section1291"] = 0] = "Section1291";
})(FundType = exports.FundType || (exports.FundType = {}));
class ShareHoldingYear {
    Year;
    TaxYear;
    IsCurrentTaxYear;
    IsPrePFICYear;
    TotalGain;
    constructor(year, taxYear, isCurrentTaxYear, isPrePFICYear) {
        this.Year = year;
        this.TaxYear = taxYear;
        this.IsCurrentTaxYear = isCurrentTaxYear;
        this.IsPrePFICYear = isPrePFICYear;
    }
    IsCurrentOrPrePFICYear() {
        return this.IsCurrentTaxYear || this.IsPrePFICYear;
    }
}
exports.ShareHoldingYear = ShareHoldingYear;
class PFIC {
    ReferenceIDNumber;
    FundName;
    ShareHoldingYears;
    ShareBlocks;
    TotalPurchaseAmount;
    TotalDisposeAmount;
    TotalGain;
    TotalOtherIncome;
    TotalIncreaseInTax;
    TotalInterest;
    Form8621;
    constructor(taxYear, referenceIDNumber, fundName, shareBlocks) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.ShareBlocks = shareBlocks;
        this.ShareHoldingYears = new Map();
        this.Form8621 = new Form8621_1.Form8621(taxYear, referenceIDNumber, fundName);
    }
}
exports.PFIC = PFIC;
class Form8621Calculator {
    static GetShareBlocks(taxYear, transactions) {
        let shareBlocks = [];
        let purchaseTransactionsMap = new Map();
        let purchaseTransactions = transactions.filter(a => a.TransactionType == Transaction_1.TransactionType.Purchase).sort((a, b) => { if (a.Date > b.Date)
            return 1;
        else
            return -1; });
        let disposeTransactions = transactions.filter(a => a.TransactionType == Transaction_1.TransactionType.Dispose).sort((a, b) => { if (a.Date > b.Date)
            return 1;
        else
            return -1; });
        purchaseTransactions.forEach(transaction => {
            purchaseTransactionsMap.set(transaction, transaction.NumberOfUnits);
        });
        disposeTransactions.forEach(disposeTransaction => {
            let unitsToDispose = disposeTransaction.NumberOfUnits;
            purchaseTransactions.forEach(purchaseTransaction => {
                if (purchaseTransactionsMap.has(purchaseTransaction) && purchaseTransaction.Date <= disposeTransaction.Date) {
                    let remainingPurchaseUnits = purchaseTransactionsMap.get(purchaseTransaction);
                    let numberOfUnitsInBlock;
                    if (remainingPurchaseUnits == unitsToDispose) {
                        numberOfUnitsInBlock = unitsToDispose;
                        purchaseTransactionsMap.delete(purchaseTransaction);
                        unitsToDispose = 0;
                    }
                    else if (remainingPurchaseUnits > unitsToDispose) {
                        numberOfUnitsInBlock = unitsToDispose;
                        purchaseTransactionsMap.set(purchaseTransaction, remainingPurchaseUnits - unitsToDispose);
                        unitsToDispose = 0;
                    }
                    else {
                        numberOfUnitsInBlock = remainingPurchaseUnits;
                        unitsToDispose -= remainingPurchaseUnits;
                        purchaseTransactionsMap.delete(purchaseTransaction);
                    }
                    if (disposeTransaction.Date.Year == taxYear) {
                        let blockPurchaseAmount = Utility_1.Utility.ConvertNumberTo2DecimalPlace(numberOfUnitsInBlock * purchaseTransaction.Amount / purchaseTransaction.NumberOfUnits);
                        let blockDisposeAmount = Utility_1.Utility.ConvertNumberTo2DecimalPlace(numberOfUnitsInBlock * disposeTransaction.Amount / disposeTransaction.NumberOfUnits);
                        let shareBlock = new ShareBlock_1.ShareBlock(taxYear, numberOfUnitsInBlock, purchaseTransaction.Date, blockPurchaseAmount, disposeTransaction.Date, blockDisposeAmount);
                        shareBlocks.push(shareBlock);
                    }
                    if (unitsToDispose == 0)
                        return;
                }
            });
        });
        return shareBlocks;
    }
    static GetUniquePFICList(taxYear, transactions) {
        let lstUniquePFICs = new Map();
        transactions.forEach(transaction => {
            if (transaction.TransactionType == Transaction_1.TransactionType.Dispose && transaction.Date.Year == taxYear && !lstUniquePFICs.has(transaction.ReferenceIDNumber)) {
                lstUniquePFICs.set(transaction.ReferenceIDNumber, transaction.FundName);
            }
        });
        return lstUniquePFICs;
    }
    static GetPFICDetails(taxYear, referenceIDNumber, fundName, usPersonStatus, transactions) {
        let lstShareBlocks = this.GetShareBlocks(taxYear, transactions);
        let lstShareHoldingYears = new Map();
        let objPFIC = new PFIC(taxYear, referenceIDNumber, fundName, lstShareBlocks);
        lstShareBlocks.forEach(shareBlock => {
            shareBlock.YearlyGainAllocations.forEach((yearlyGainAllocation, year) => {
                let objShareHoldingYear;
                if (!lstShareHoldingYears.has(year)) {
                    let blnIsCurrentYear = (year == taxYear);
                    let blnIsPrePFICYear;
                    if (!usPersonStatus.IsUSPersonSinceBirth && usPersonStatus.USPersonSinceTaxYear > year)
                        blnIsPrePFICYear = true;
                    else
                        blnIsPrePFICYear = false;
                    let objShareHoldingYear = new ShareHoldingYear(year, taxYear, blnIsCurrentYear, blnIsPrePFICYear);
                    objShareHoldingYear.TotalGain = yearlyGainAllocation.GainAllocation;
                    lstShareHoldingYears.set(year, objShareHoldingYear);
                }
                else {
                    objShareHoldingYear = lstShareHoldingYears.get(year);
                    objShareHoldingYear.TotalGain += yearlyGainAllocation.GainAllocation;
                }
            });
        });
        objPFIC.TotalPurchaseAmount = lstShareBlocks.reduce((sum, block) => sum + block.PurchaseAmount, 0);
        objPFIC.TotalDisposeAmount = lstShareBlocks.reduce((sum, block) => sum + block.DisposeAmount, 0);
        objPFIC.TotalGain = Utility_1.Utility.ConvertNumberTo2DecimalPlace(objPFIC.TotalDisposeAmount - objPFIC.TotalPurchaseAmount);
        objPFIC.ShareHoldingYears = lstShareHoldingYears;
        let totalInterest = 0;
        let totalGainInCurrentOrPrePFICYears = 0;
        let totalTaxIncrease = 0;
        if (objPFIC.TotalGain > 0) {
            lstShareHoldingYears.forEach((shareHoldingYear, year) => {
                if (shareHoldingYear.IsCurrentOrPrePFICYear())
                    totalGainInCurrentOrPrePFICYears += shareHoldingYear.TotalGain;
                else {
                    let taxIncrease = Utility_1.Utility.ConvertNumberTo2DecimalPlace(shareHoldingYear.TotalGain * TaxRate_1.TaxRate.GetTaxRateByYear(year) / 100);
                    totalTaxIncrease += taxIncrease;
                    totalInterest += InterestCalculator_1.InterestCalculator.CalculateInterest(taxIncrease, new Date_1.Date(year + 1, 4, 15), new Date_1.Date(taxYear + 1, 4, 15));
                }
            });
        }
        objPFIC.TotalInterest = totalInterest;
        objPFIC.TotalOtherIncome = totalGainInCurrentOrPrePFICYears;
        objPFIC.TotalIncreaseInTax = totalTaxIncrease;
        objPFIC.Form8621.Line15f = objPFIC.TotalGain;
        if (objPFIC.TotalGain <= 0) {
            objPFIC.Form8621.Line16b = null;
            objPFIC.Form8621.Line16c = null;
            objPFIC.Form8621.Line16d = null;
            objPFIC.Form8621.Line16e = null;
            objPFIC.Form8621.Line16f = null;
        }
        else {
            objPFIC.Form8621.Line16b = totalGainInCurrentOrPrePFICYears;
            objPFIC.Form8621.Line16c = totalTaxIncrease;
            objPFIC.Form8621.Line16d = 0;
            objPFIC.Form8621.Line16e = totalTaxIncrease;
            objPFIC.Form8621.Line16f = totalInterest;
        }
        return objPFIC;
    }
    static Audit(taxYear, fundType, usPersonStatus, transactions) {
    }
    static Compute(taxYear, fundType, usPersonStatus, transactions) {
        let result = [];
        let uniquePFICList = this.GetUniquePFICList(taxYear, transactions);
        uniquePFICList.forEach((fundName, referenceIDNumber) => {
            let lstTransactions = transactions.filter((t) => t.ReferenceIDNumber == referenceIDNumber);
            let objPFIC = Form8621Calculator.GetPFICDetails(taxYear, referenceIDNumber, fundName, usPersonStatus, lstTransactions);
            result.push(objPFIC);
        });
        return result;
    }
}
exports.Form8621Calculator = Form8621Calculator;
//# sourceMappingURL=Form8621Calculator.js.map