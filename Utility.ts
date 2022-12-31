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

}
class UnitBlockYearDetail
{
    Year:number;
    NumberOfDays:number;
    Line16c:number;
    IsResident:boolean;
}
class RefernceIDYearDetail
{
    Year:number;
    Line16cTotal:number;
}

class UnitBlock
{
    NumberOfUnits:number;
    PurchaseDate:Date;
    PurchaseAmount:number;
    DisposeDate:Date;
    DisposeAmount:number;
    UnitBlockYearDetail:UnitBlockYearDetail[];
    Line16B:number;
}
class ExcessDistributionSummary
{
    Life15f:number;
    Line16b:number;
    Line16c:number;
    Line16d:number;
    Line16e:number;
    Line16f:number;

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
}
class Output8621
{
    TaxYear:number;
    RefernceIDDetails:RefernceIDDetail[];
}
class Form8621Calculator
{
    GetBlocks(transactions:Transaction[])
    {
        let arrayUnitBlocks:UnitBlock[] = [];
        let PurchaseTransactions:[Transaction, number][];
        transactions.sort().forEach(transaction => {
            if(transaction.TransactionType==TransactionType.Purchase)
            {
                PurchaseTransactions.push([transaction,transaction.NumberOfUnits]);
            }
            else
            {
                let UnitsToDispose = transaction.NumberOfUnits;
                PurchaseTransactions.forEach(purchaseTransactionUnitTuple => {
                    if(UnitsToDispose>0)
                    {
                    let purchaseTransaction:Transaction = purchaseTransactionUnitTuple[0];
                    let remainingPurchaseUnitsInPurchaseTransaction:number = purchaseTransactionUnitTuple[1];
                    if(remainingPurchaseUnitsInPurchaseTransaction>0)
                    {
                        let unitBlock = new UnitBlock();
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
                lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
        });
        lstReferenceIDNumbers.forEach(referenceIDNumber=>
            {
                let lstTransactions:Transaction[] = input.Transactions.filter((t)=>t.ReferenceIDNumber==referenceIDNumber);
                let refernceIDDetail:RefernceIDDetail=new RefernceIDDetail();
                refernceIDDetail.ReferenceIDNumber=referenceIDNumber;
                refernceIDDetail.UnitBlocks=this.GetBlocks(lstTransactions);
                result.RefernceIDDetails.push(refernceIDDetail);

            });

        return result;
    }
}
let message: string = 'Hello World';
console.log(message);
//function Test()
{
    let input = new Input8621();
    let calculator = new Form8621Calculator();
    input.TaxYear=2022;
    input.USPersonSince=-1;
    input.FundType=FundType.Section1291;
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Purchase, new Date('12/12/2021'), 100.51, 50.33 ));
    input.Transactions.push(new Transaction("abc", "aaa",  TransactionType.Dispose, new Date('12/12/2021'), 100.51, 50.33 ));
    let result = calculator.Compile(input);
    console.log(result);
}