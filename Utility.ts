import {InterestCalculator} from "./InterestCalculator"
import {TaxRate} from "./TaxRate"
enum TransactionType
{
    Purchase,
    Dispose
}

enum FundType
{
    Section1291
}
class Transaction
{
    constructor(referenceIDNumber:string, fundName:string, transactionType:TransactionType, date:Date, numberOfUnits:number, amount:number)
    {
        this.ReferenceIDNumber=referenceIDNumber;
        this.FundName=fundName;
        this.TransactionType=transactionType;
        this.Date=date;
        this.NumberOfUnits=numberOfUnits;
        this.Amount=amount;
    }
    ReferenceIDNumber:string;
    FundName:string;
    TransactionType:TransactionType ;
    Date:Date;
    NumberOfUnits:number;
    Amount:number;
}
class Input8621
{
    TaxYear:number;
    USPersonSince:number;
    FundType:FundType;
    Transactions:Transaction[];
    constructor()
    {
        this.Transactions=[];
    }
}
class UnitBlockYearDetail
{
    Year:number;
    NumberOfDays:number;
    Line16c:number;
    IsResident:boolean;
    constructor(year:number)
    {
        this.Year=year;
    }
}
class ReferenceIDYearDetail
{
    Year:number;
    Line16cTotal:number;
    Interest:number;
    constructor(year:number,line16cTotal:number,taxYear:number)
    {
        this.Year=year;
        this.Line16cTotal=line16cTotal;
        let interestCalculator:InterestCalculator = new InterestCalculator();
        this.Interest = interestCalculator.CalculateInterest(new Date(year,3,15),new Date(taxYear,3,15),line16cTotal)
    }
}

class UnitBlock
{
    NumberOfUnits:number;
    PurchaseDate:Date;
    PurchaseAmount:number;
    DisposeDate:Date;
    DisposeAmount:number;
    UnitBlockYearDetails:UnitBlockYearDetail[];
    Line16B:number;
    constructor(taxYear:number,purchaseDate:Date,purchaseAmount:number,disposeDate:Date,disposeAmount:number)
    {
        this.UnitBlockYearDetails = [];
        let purchaseYear=purchaseDate.getFullYear();
        let disposeYear=disposeDate.getFullYear();
        let totalNumberOfDays:number=0;
        for(let year=purchaseYear;year<=disposeYear;year++)
        {
            let unitBlockYearDetail:UnitBlockYearDetail = new UnitBlockYearDetail(year);
            let holdingStartDateInYear:Date;
            let holdingEndDateInYear:Date;
            if(year==purchaseYear)
            {
                holdingStartDateInYear = purchaseDate;
            }
            else
            {
                holdingStartDateInYear = new Date(year,0,1);
            }
            if(year==disposeYear)
            {
                holdingEndDateInYear=disposeDate;
            }
            else
            {
                holdingEndDateInYear = new Date(year,11,31);
            }
            let numberOfDays:number=0;
            let day:Date=holdingStartDateInYear;
            while(day<holdingEndDateInYear)
            {
                numberOfDays++;
                day.setDate(day.getDate()+1);
            }
            unitBlockYearDetail.NumberOfDays=numberOfDays;
            totalNumberOfDays+=numberOfDays;
            this.UnitBlockYearDetails.push(unitBlockYearDetail);
        }
        let profit:number = disposeAmount-purchaseAmount;
        this.UnitBlockYearDetails.forEach(unitBlockYearDetail => {
            let profitInYear = profit*unitBlockYearDetail.NumberOfDays/totalNumberOfDays;
            unitBlockYearDetail.Line16c=profit*unitBlockYearDetail.NumberOfDays/totalNumberOfDays;
            if(unitBlockYearDetail.Year==taxYear)
            {
                this.Line16B+=profitInYear;
            }
            else
            {
                unitBlockYearDetail.Line16c=profitInYear;
            }
        });
        
    }
}
class ExcessDistributionSummary
{
    Line15f:number;
    Line16b:number;
    Line16c:number;
    Line16d:number;
    Line16e:number;
    Line16f:number;
    constructor()
    {
        this.Line15f=0;
        this.Line16b=0;
        this.Line16c=0;
        this.Line16d=0;
        this.Line16e=0;
        this.Line16f=0;
    }
}
class ReferenceIDDetail
{
    ReferenceIDNumber:string;
    FundName:string;
    UnitBlocks:UnitBlock[];
    PurchaseTotal:number;
    DisposeTotal:number;
    Line16bTotal:number;
    ReferenceIDYearDetail:ReferenceIDYearDetail[];
    ExcessDistributionSummary:ExcessDistributionSummary;
    constructor(referenceIDNumber:string,fundName:string)
    {
        this.ReferenceIDNumber=referenceIDNumber;
        this.FundName=fundName;
        this.ReferenceIDYearDetail=[];
        this.ExcessDistributionSummary = new ExcessDistributionSummary();
    }
}
class Output8621
{
    TaxYear:number;
    ReferenceIDDetails:ReferenceIDDetail[];
    constructor()
    {
        this.ReferenceIDDetails=[];
    }
}
class Form8621Calculator
{
    GetBlocks(transactions:Transaction[],taxYear:number)
    {
        let arrayUnitBlocks:UnitBlock[] = [];
        let PurchaseTransactions:[Transaction, number][]=[];
        transactions.sort().forEach(transaction => {
            if(transaction.TransactionType==TransactionType.Purchase)
            {
                PurchaseTransactions.push([transaction,transaction.NumberOfUnits]);
            }
            else
            {
                let UnitsToDispose = transaction.NumberOfUnits;
                if(transaction.Date.getFullYear()==taxYear)
                {
                    PurchaseTransactions.forEach(purchaseTransactionUnitTuple => {
                    if(UnitsToDispose>0)
                    {
                    let purchaseTransaction:Transaction = purchaseTransactionUnitTuple[0];
                    let remainingPurchaseUnitsInPurchaseTransaction:number = purchaseTransactionUnitTuple[1];
                    if(remainingPurchaseUnitsInPurchaseTransaction>0)
                    {
                        let unitBlock = new UnitBlock(taxYear,purchaseTransaction.Date,purchaseTransaction.Amount,transaction.Date,transaction.Amount);
                        if(remainingPurchaseUnitsInPurchaseTransaction>=UnitsToDispose)
                        {
                            unitBlock.NumberOfUnits=transaction.NumberOfUnits;
                            purchaseTransactionUnitTuple[1]-=transaction.NumberOfUnits;
                            UnitsToDispose=0;
                        }
                        else
                        {
                            unitBlock.NumberOfUnits=remainingPurchaseUnitsInPurchaseTransaction;
                            UnitsToDispose -= remainingPurchaseUnitsInPurchaseTransaction;
                            purchaseTransactionUnitTuple[1]=0;
                        }
                        unitBlock.PurchaseDate=purchaseTransaction.Date;
                        unitBlock.PurchaseAmount=unitBlock.NumberOfUnits*purchaseTransaction.Amount/purchaseTransaction.NumberOfUnits;
                        unitBlock.DisposeDate=transaction.Date;
                        unitBlock.DisposeAmount=unitBlock.NumberOfUnits*transaction.Amount/transaction.NumberOfUnits;

                        arrayUnitBlocks.push(unitBlock);
                    }
                }
                });
            }}
        });
        return arrayUnitBlocks;
    }
    Compile(input:Input8621)
    {
        let result = new Output8621();
        result.TaxYear=input.TaxYear;
        let lstReferenceIDNumbers:string[]=[];
        input.Transactions.forEach(transaction=>{
            if(!lstReferenceIDNumbers.includes(transaction.ReferenceIDNumber))
            {    
                lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
            }
        }
        );
        lstReferenceIDNumbers.forEach(referenceIDNumber=>
            {
                let lstTransactions:Transaction[] = input.Transactions.filter((t)=>t.ReferenceIDNumber==referenceIDNumber);
                let referenceIDDetail:ReferenceIDDetail=new ReferenceIDDetail(referenceIDNumber,lstTransactions[0].FundName);
                referenceIDDetail.UnitBlocks=this.GetBlocks(lstTransactions,input.TaxYear);
                referenceIDDetail.PurchaseTotal = referenceIDDetail.UnitBlocks.reduce((sum,block)=>sum+block.PurchaseAmount,0);
                referenceIDDetail.DisposeTotal = referenceIDDetail.UnitBlocks.reduce((sum,block)=>sum+block.DisposeAmount,0);
                let totalInterest:number=0;
                console.log(referenceIDDetail.UnitBlocks);
                let taxRateCalculator:TaxRate = new TaxRate();
                referenceIDDetail.UnitBlocks[0].UnitBlockYearDetails.forEach(unitBlockYearDetail => {
                   
                    let year:number = unitBlockYearDetail.Year;
                    let line16cSum:number= referenceIDDetail.UnitBlocks.reduce((sum,unitBlock)=>sum+unitBlock.UnitBlockYearDetails.find(x=>x.Year==year).Line16c,0);
                    let referenceIDYearDetail:ReferenceIDYearDetail = new ReferenceIDYearDetail(year,line16cSum,input.TaxYear);
                    totalInterest += referenceIDYearDetail.Interest;
                    referenceIDDetail.ExcessDistributionSummary.Line16c+=line16cSum * taxRateCalculator.GetTaxRateByYear(year);

                    referenceIDDetail.ReferenceIDYearDetail.push(referenceIDYearDetail);
                });
                referenceIDDetail.ExcessDistributionSummary.Line16c=referenceIDDetail.DisposeTotal-referenceIDDetail.PurchaseTotal;
                referenceIDDetail.ExcessDistributionSummary.Line16e=referenceIDDetail.ExcessDistributionSummary.Line16c;
                referenceIDDetail.ExcessDistributionSummary.Line16f=totalInterest;
                result.ReferenceIDDetails.push(referenceIDDetail);

            });

        return result;
    }
}
function Test()
{
    let input = new Input8621();
    let calculator = new Form8621Calculator();
    input.TaxYear=2022;
    input.USPersonSince=-1;
    input.FundType=FundType.Section1291;
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Purchase, new Date('12/12/2021'), 100, 50 ));
    input.Transactions.push(new Transaction("abc", "aaa",  TransactionType.Dispose, new Date('12/12/2022'), 30, 150.33 ));
    input.Transactions.push(new Transaction("abc", "aaa",  TransactionType.Dispose, new Date('12/15/2022'), 60, 80.33 ));
    let result = calculator.Compile(input);
    console.info(result.ReferenceIDDetails[0].UnitBlocks[0]);
}
Test();