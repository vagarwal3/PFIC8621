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
class RefernceIDYearDetail
{
    Year:number;
    Line16cTotal:number;
    constructor(year:number,line16cTotal:number)
    {
        this.Year=year;
        this.Line16cTotal=line16cTotal;
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
    constructor(purchaseDate:Date,purchaseAmount:number,disposeDate:Date,disposeAmount:number)
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
            unitBlockYearDetail.Line16c=profit*unitBlockYearDetail.NumberOfDays/totalNumberOfDays;
        });
    }
}
class ExcessDistributionSummary
{
    Life15f:number;
    Line16b:number;
    Line16c:number;
    Line16d:number;
    Line16e:number;
    Line16f:number;
    constructor()
    {
        this.Life15f=0;
        this.Line16b=0;
        this.Line16c=0;
        this.Line16d=0;
        this.Line16e=0;
        this.Line16f=0;
    }
}
class RefernceIDDetail
{
    ReferenceIDNumber:string;
    FundName:string;
    UnitBlocks:UnitBlock[];
    PurchaseTotal:number;
    DisposeTotal:number;
    Line16bTotal:number;
    RefernceIDYearDetail:RefernceIDYearDetail[];
    ExcessDistributionSummary:ExcessDistributionSummary;
    constructor(referenceIDNumber:string,fundName:string)
    {
        this.ReferenceIDNumber=referenceIDNumber;
        this.FundName=fundName;
        this.RefernceIDYearDetail=[];
        this.ExcessDistributionSummary = new ExcessDistributionSummary();
    }
}
class Output8621
{
    TaxYear:number;
    RefernceIDDetails:RefernceIDDetail[];
    constructor()
    {
        this.RefernceIDDetails=[];
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
                if(transaction.Date.getFullYear()!=taxYear)
                PurchaseTransactions.forEach(purchaseTransactionUnitTuple => {
                    if(UnitsToDispose>0)
                    {
                    let purchaseTransaction:Transaction = purchaseTransactionUnitTuple[0];
                    let remainingPurchaseUnitsInPurchaseTransaction:number = purchaseTransactionUnitTuple[1];
                    if(remainingPurchaseUnitsInPurchaseTransaction>0)
                    {
                        let unitBlock = new UnitBlock(purchaseTransaction.Date,purchaseTransaction.Amount,transaction.Date,transaction.Amount);
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
            }
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
                let referenceIDDetail:RefernceIDDetail=new RefernceIDDetail(referenceIDNumber,lstTransactions[0].FundName);
                referenceIDDetail.UnitBlocks=this.GetBlocks(lstTransactions,input.TaxYear);
                referenceIDDetail.PurchaseTotal = referenceIDDetail.UnitBlocks.reduce((sum,block)=>sum+block.PurchaseAmount,0);
                referenceIDDetail.DisposeTotal = referenceIDDetail.UnitBlocks.reduce((sum,block)=>sum+block.DisposeAmount,0);
                referenceIDDetail.UnitBlocks[0].UnitBlockYearDetails.forEach(unitBlockYearDetail => {
                    let year:number = unitBlockYearDetail.Year;
                    let line16cSum:number= referenceIDDetail.UnitBlocks.reduce((sum,unitBlock)=>sum+unitBlock.UnitBlockYearDetails.find(x=>x.Year==year).Line16c,0);
                    let refernceIDYearDetail:RefernceIDYearDetail = new RefernceIDYearDetail(year,line16cSum);
                    referenceIDDetail.RefernceIDYearDetail.push(refernceIDYearDetail);
                });
                referenceIDDetail.ExcessDistributionSummary.Life15f=0;
                result.RefernceIDDetails.push(referenceIDDetail);

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
    console.info(result.RefernceIDDetails[0].UnitBlocks[0]);
}
Test();