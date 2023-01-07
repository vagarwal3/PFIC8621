import { InterestCalculator } from "./InterestCalculator"
import { TaxRate } from "./TaxRate"
import { ShareBlock, ShareBlockYearDetail } from "./ShareBlock";

export enum TransactionType {
    Purchase,
    Dispose
}

export enum FundType {
    Section1291
}
export class Transaction {
    constructor(referenceIDNumber: string, fundName: string, transactionType: TransactionType, date: Date, numberOfUnits: number, amount: number) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.TransactionType = transactionType;
        this.Date = date;
        this.NumberOfUnits = numberOfUnits;
        this.Amount = amount;
    }
    ReferenceIDNumber: string;
    FundName: string;
    TransactionType: TransactionType;
    Date: Date;
    NumberOfUnits: number;
    Amount: number;
}
export class Input8621 {
    TaxYear: number;
    USPersonSinceBirth: boolean;
    USPersonSinceYear: number | null;
    FundType: FundType;
    Transactions: Transaction[];
    constructor(taxYear: number, usPersonSinceBirth: boolean, usPersonSinceYear: number | null) {
        this.TaxYear = taxYear;
        this.USPersonSinceBirth = usPersonSinceBirth;
        this.USPersonSinceYear = usPersonSinceYear;
        this.Transactions = [];
    }
}

export class ReferenceIDYearDetail {
    Year: number;
    Line16cTotal: number;
    Interest: number;
    constructor(year: number, line16cTotal: number, taxYear: number) {
        this.Year = year;
        this.Line16cTotal = line16cTotal;
        let interestCalculator: InterestCalculator = new InterestCalculator();
        this.Interest = interestCalculator.CalculateInterest(new Date(year, 3, 15), new Date(taxYear, 3, 15), line16cTotal)
    }
}

class ExcessDistributionSummary {
    Line15f: number;
    Line16b: number;
    Line16c: number;
    Line16d: number;
    Line16e: number;
    Line16f: number;
    constructor() {
        this.Line15f = 0;
        this.Line16b = 0;
        this.Line16c = 0;
        this.Line16d = 0;
        this.Line16e = 0;
        this.Line16f = 0;
    }
}
export class ReferenceIDDetail {
    ReferenceIDNumber: string;
    FundName: string;
    ShareBlocks: ShareBlock[];
    PurchaseTotal: number;
    DisposeTotal: number;
    Line16bTotal: number;
    ReferenceIDYearDetail: ReferenceIDYearDetail[];
    ExcessDistributionSummary: ExcessDistributionSummary;
    constructor(referenceIDNumber: string, fundName: string) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.ReferenceIDYearDetail = [];
        this.ExcessDistributionSummary = new ExcessDistributionSummary();
    }
}
export class Output8621 {
    TaxYear: number;
    ReferenceIDDetails: ReferenceIDDetail[];
    constructor(taxYear: number) {
        this.TaxYear = taxYear;
        this.ReferenceIDDetails = [];
    }
}
export class Form8621Calculator {
    GetShareBlocks(transactions: Transaction[], taxYear: number) {
        let arrayShareBlocks: ShareBlock[] = [];
        let PurchaseTransactions: [Transaction, number][] = [];
        transactions.sort().forEach(transaction => {
            if (transaction.TransactionType == TransactionType.Purchase) {
                PurchaseTransactions.push([transaction, transaction.NumberOfUnits]);
            }
            else {
                let UnitsToDispose = transaction.NumberOfUnits;

                PurchaseTransactions.forEach(purchaseTransactionUnitTuple => {
                    if (UnitsToDispose > 0) {
                        let purchaseTransaction: Transaction = purchaseTransactionUnitTuple[0];
                        let remainingPurchaseUnitsInPurchaseTransaction: number = purchaseTransactionUnitTuple[1];
                        if (remainingPurchaseUnitsInPurchaseTransaction > 0) {
                            let numberOfUnitsInBlock: number;
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
                            let blockPurchaseAmount: number = numberOfUnitsInBlock * purchaseTransaction.Amount / purchaseTransaction.NumberOfUnits;
                            let blockDisposeAmount: number = numberOfUnitsInBlock * transaction.Amount / transaction.NumberOfUnits;

                            if (transaction.Date.getFullYear() == taxYear) {
                                let shareBlock = new ShareBlock(taxYear, true, null, numberOfUnitsInBlock, purchaseTransaction.Date, blockPurchaseAmount, transaction.Date, blockDisposeAmount);
                                arrayShareBlocks.push(shareBlock);
                            }
                        }
                    }
                });

            }
        });
        return arrayShareBlocks;
    }
    GetUniqueReferenceIDNumbers(transactions: Transaction[], taxYear: number) {
        let lstReferenceIDNumbers: string[] = [];
        transactions.forEach(transaction => {
            if (transaction.TransactionType == TransactionType.Dispose && transaction.Date.getFullYear() == taxYear && !lstReferenceIDNumbers.includes(transaction.ReferenceIDNumber)) {
                lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
            }
        }
        );
        return lstReferenceIDNumbers;
    }
    Audit(input: Input8621) {

    }
    Compute(input: Input8621) {
        let result = new Output8621(input.TaxYear);
        let lstReferenceIDNumbers: string[] = this.GetUniqueReferenceIDNumbers(input.Transactions, input.TaxYear);

        lstReferenceIDNumbers.forEach(referenceIDNumber => {
            let lstTransactions: Transaction[] = input.Transactions.filter((t) => t.ReferenceIDNumber == referenceIDNumber);
            let referenceIDDetail: ReferenceIDDetail = new ReferenceIDDetail(referenceIDNumber, lstTransactions[0].FundName);
            referenceIDDetail.ShareBlocks = this.GetShareBlocks(lstTransactions, input.TaxYear);
            referenceIDDetail.PurchaseTotal = referenceIDDetail.ShareBlocks.reduce((sum, block) => sum + block.PurchaseAmount, 0);
            referenceIDDetail.DisposeTotal = referenceIDDetail.ShareBlocks.reduce((sum, block) => sum + block.DisposeAmount, 0);
            let totalInterest: number = 0;

            let taxRateCalculator: TaxRate = new TaxRate();
            let years:number[]=[];
            referenceIDDetail.ShareBlocks.forEach(shareBlock=>{shareBlock.ShareBlockYearDetails.forEach(shareBlockYearDetail=>
            {
                if (!years.includes(shareBlockYearDetail.Year))
                        years.push(shareBlockYearDetail.Year);})
            });
            if (years.length > 0) {
                years.forEach(year => 
                {
                    for(let i=0;i<referenceIDDetail.ShareBlocks.length;i++)
                    {
                        let shareBlockYearDetail = referenceIDDetail.ShareBlocks[0].ShareBlockYearDetails.find(yearDetail=>yearDetail.Year==year);
                        if(shareBlockYearDetail!=null)
                        {
                            shareBlockYearDetail.GetLine16c
                        }
                    }
                    let priorPeriodProfitSum: number = referenceIDDetail.ShareBlocks.reduce((sum, shareBlock: ShareBlock) => sum + shareBlock.PriorYearProfitSum, 0);
                    let referenceIDYearDetail: ReferenceIDYearDetail = new ReferenceIDYearDetail(year, priorPeriodProfitSum, input.TaxYear);
                    totalInterest += referenceIDYearDetail.Interest;
                    referenceIDDetail.ExcessDistributionSummary.Line16c += priorPeriodProfitSum * taxRateCalculator.GetTaxRateByYear(year);

                    referenceIDDetail.ReferenceIDYearDetail.push(referenceIDYearDetail);
                });
            }
            referenceIDDetail.ExcessDistributionSummary.Line16b = referenceIDDetail.ShareBlocks.reduce((sum, shareBlock: ShareBlock) => sum + shareBlock.Line16B, 0);
            referenceIDDetail.ExcessDistributionSummary.Line16e = referenceIDDetail.ExcessDistributionSummary.Line16c;
            referenceIDDetail.ExcessDistributionSummary.Line16f = totalInterest;
            result.ReferenceIDDetails.push(referenceIDDetail);

        });

        return result;
    }
}