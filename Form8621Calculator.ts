import { InterestCalculator } from "./InterestCalculator"
import { TaxRate } from "./TaxRate"
import { ShareBlock, YearlyGainAllocation } from "./ShareBlock";
import { Transaction,TransactionType } from "./Transaction";
import { USPersonStatus } from "./USPersonStatus";
import { Form8621 } from "./Form8621";

export enum FundType {
    Section1291
}

export class ShareHoldingYear {
    Year: number;
    TaxYear: number;
    IsCurrentTaxYear: boolean;
    IsPrePFICYear: boolean;
    TotalGain: number;
    constructor(year: number, taxYear: number, isCurrentTaxYear: boolean, isPrePFICYear: boolean) {
        this.Year = year;
        this.TaxYear = taxYear;
        this.IsCurrentTaxYear = isCurrentTaxYear;
        this.IsPrePFICYear = isPrePFICYear;
    }
    IsCurrentOrPrePFICYear(): boolean {
        if (this.IsCurrentTaxYear || this.IsPrePFICYear)
            return true;
        else
            return false;
    }
}

export class PFIC {
    ReferenceIDNumber: string;
    FundName: string;
    ShareHoldingYears: Map<number, ShareHoldingYear>;
    ShareBlocks: ShareBlock[];
    TotalPurchaseAmount: number;
    TotalDisposeAmount: number;
    TotalGain: number;
    TotalOtherIncome: number;
    TotalIncreaseInTax: number;
    TotalInterest: number;
    Form8621: Form8621;
    constructor(taxYear: number,referenceIDNumber: string, fundName: string, shareBlocks: ShareBlock[]) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.ShareBlocks = shareBlocks;
        this.ShareHoldingYears = new Map<number, ShareHoldingYear>();
        this.Form8621 = new Form8621(taxYear,referenceIDNumber, fundName);
    }
}

export class Form8621Calculator {
    static GetShareBlocks(taxYear: number, transactions: Transaction[]) {
        let shareBlocks: ShareBlock[] = [];
        let purchaseTransactionsMap: Map<Transaction, number> = new Map<Transaction, number>();
        let purchaseTransactions: Transaction[] = transactions.filter(a => a.TransactionType == TransactionType.Purchase).sort((a:Transaction,b:Transaction) => {if(a.Date>b.Date) return 1; else return -1});
        let disposeTransactions: Transaction[] = transactions.filter(a => a.TransactionType == TransactionType.Dispose).sort((a:Transaction,b:Transaction) => {if(a.Date>b.Date) return 1; else return -1});

        purchaseTransactions.forEach(transaction => {
            purchaseTransactionsMap.set(transaction, transaction.NumberOfUnits);
        });

        disposeTransactions.forEach(disposeTransaction => {
            let unitsToDispose: number = disposeTransaction.NumberOfUnits;
            purchaseTransactions.forEach(purchaseTransaction => {
                if (purchaseTransactionsMap.has(purchaseTransaction) && purchaseTransaction.Date <= disposeTransaction.Date) {
                    let remainingPurchaseUnits = purchaseTransactionsMap.get(purchaseTransaction) as number;
                    let numberOfUnitsInBlock: number;
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

                    if (disposeTransaction.Date.getFullYear() == taxYear) {
                        let blockPurchaseAmount: number = numberOfUnitsInBlock * purchaseTransaction.Amount / purchaseTransaction.NumberOfUnits;
                        let blockDisposeAmount: number = numberOfUnitsInBlock * disposeTransaction.Amount / disposeTransaction.NumberOfUnits;
                        let shareBlock = new ShareBlock(taxYear, numberOfUnitsInBlock, purchaseTransaction.Date, blockPurchaseAmount, disposeTransaction.Date, blockDisposeAmount);
                        shareBlocks.push(shareBlock);
                    }
                    if (unitsToDispose == 0)
                        return;
                }
            });
        });
        return shareBlocks;
    }
    static GetUniquePFICList(taxYear: number, transactions: Transaction[]) {
        let lstUniquePFICs: Map<string, string> = new Map<string, string>();
        transactions.forEach(transaction => {
            if (transaction.TransactionType == TransactionType.Dispose && transaction.Date.getFullYear() == taxYear && !lstUniquePFICs.has(transaction.ReferenceIDNumber)) {
                lstUniquePFICs.set(transaction.ReferenceIDNumber, transaction.FundName);
            }
        }
        );
        return lstUniquePFICs;
    }
    static GetPFICDetails(taxYear: number, referenceIDNumber: string, fundName: string, usPersonStatus:USPersonStatus, transactions: Transaction[]) {
        let lstShareBlocks: ShareBlock[] = this.GetShareBlocks(taxYear, transactions);
        let lstShareHoldingYears: Map<number, ShareHoldingYear> = new Map<number, ShareHoldingYear>();
        let objPFIC: PFIC = new PFIC(taxYear,referenceIDNumber, fundName, lstShareBlocks);


        lstShareBlocks.forEach(shareBlock => {
            shareBlock.YearlyGainAllocations.forEach((yearlyGainAllocation,year:number, ) => {
                let objShareHoldingYear: ShareHoldingYear;
                if (!lstShareHoldingYears.has(year)) {
                    let blnIsCurrentYear: boolean = (year == taxYear);
                    let blnIsPrePFICYear: boolean;
                    if (!usPersonStatus.IsUSPersonSinceBirth && usPersonStatus.USPersonSinceTaxYear as number > year)
                        blnIsPrePFICYear = true;
                    else
                        blnIsPrePFICYear = false;

                    let objShareHoldingYear: ShareHoldingYear = new ShareHoldingYear(year,taxYear, blnIsCurrentYear, blnIsPrePFICYear);
                    objShareHoldingYear.TotalGain = yearlyGainAllocation.GainAllocation;
                    lstShareHoldingYears.set(year, objShareHoldingYear);
                }
                else {
                    objShareHoldingYear = lstShareHoldingYears.get(year) as ShareHoldingYear;
                    objShareHoldingYear.TotalGain += yearlyGainAllocation.GainAllocation;
                }
            })
        });

        objPFIC.TotalPurchaseAmount = lstShareBlocks.reduce((sum, block) => sum + block.PurchaseAmount, 0);
        objPFIC.TotalDisposeAmount = lstShareBlocks.reduce((sum, block) => sum + block.DisposeAmount, 0);
        objPFIC.TotalGain = objPFIC.TotalDisposeAmount - objPFIC.TotalPurchaseAmount;
        objPFIC.ShareHoldingYears = lstShareHoldingYears;

        let totalInterest: number = 0;

        let totalGainInCurrentOrPrePFICYears: number = 0;
        let totalTaxIncrease: number = 0;
        lstShareHoldingYears.forEach((shareHoldingYear,year) => {
            if (!shareHoldingYear.IsCurrentOrPrePFICYear)
                totalInterest += InterestCalculator.CalculateInterest(shareHoldingYear.TotalGain, new Date(year, 3, 15), new Date(taxYear + 1, 3, 15));
            else {
                totalGainInCurrentOrPrePFICYears += shareHoldingYear.TotalGain;
                totalTaxIncrease += shareHoldingYear.TotalGain * TaxRate.GetTaxRateByYear(year);
            }
        });

        objPFIC.Form8621.Line15f = objPFIC.TotalGain;
        objPFIC.Form8621.Line16b = totalGainInCurrentOrPrePFICYears;

        objPFIC.Form8621.Line16c = totalTaxIncrease;

        objPFIC.Form8621.Line16d = 0;

        objPFIC.Form8621.Line16e = totalTaxIncrease;

        objPFIC.Form8621.Line16f = totalInterest;
        return objPFIC;

    }
    static Audit(taxYear: number, fundType: FundType, usPersonStatus: USPersonStatus, transactions: Transaction[]) {

    }
    static Compute(taxYear: number, fundType: FundType, usPersonStatus: USPersonStatus, transactions: Transaction[]) {
        let result: PFIC[] = [];
        let uniquePFICList: Map<string, string> = this.GetUniquePFICList(taxYear, transactions);

        uniquePFICList.forEach((fundName: string, referenceIDNumber: string) => {
            let lstTransactions: Transaction[] = transactions.filter((t) => t.ReferenceIDNumber == referenceIDNumber);

            let objPFIC: PFIC = Form8621Calculator.GetPFICDetails(taxYear, referenceIDNumber, fundName,usPersonStatus, lstTransactions);

            result.push(objPFIC);
        });
        return result;
    }
}