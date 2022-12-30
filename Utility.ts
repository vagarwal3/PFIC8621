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
    ReferenceIDNumber:string;
    FundName:string;
    TransactionType:TransactionType ;
    Date:Date;
    NumberOfUnits:Decimal;
    Amount:Decimal;
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
class UnitBlockYearDetail
{
    NumberOfDays:number;
    Line16c:number;
    IsResident:boolean;
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
        let arrayUnitBlocks:UnitBlock[];
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
                    let remainingPurchaseUnitsInPurchaseTransaction:Number = purchaseTransactionUnitTuple[1];
                    if(remainingPurchaseUnitsInPurchaseTransaction>0)
                    {
                        let unitBlock = new UnitBlock();
                        if(remainingPurchaseUnitsInPurchaseTransaction>=UnitsToDispose)
                        {
                            unitBlock.NumberOfUnits=disposeTransaction.NumberOfUnits;
                            purchaseTransactionUnitTuple[1]-=disposeTransaction.NumberOfUnits;
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
                        unitBlock.DisposeDate=disposeTransaction.Date;
                        unitBlock.DisposeAmount=unitBlock.NumberOfUnits*disposeTransaction.Amount/disposeTransaction.NumberOfUnits;
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
        let lstReferenceIDNumbers = input.Transactions.select(ReferenceIDNumber);
        lstReferenceIDNumbers.foreach(ReferenceIDNumber=>
            {
                let lstTransactions = input.Transactions.find(ReferenceIDNumber);
                let refernceIDDetail:RefernceIDDetail=new RefernceIDDetail();
                refernceIDDetail.ReferenceIDNumber=purchaseTransaction.ReferenceIDNumber;
                refernceIDDetail.UnitBlocks=GetBlocks(lstTransactions);
                result.RefernceIDDetails.push(refernceIDDetail);

            });

        return result;
    }
}
function Test()
{
    let input = new Input8621();
    input.TaxYear=2022;
    input.USPersonSince=-1;
    input.FundType=FundType.Section1291;
    input.Transactions.push(new Transaction({ ReferenceIDNumber: "abc", FundName: "aaa", TransactionType: TransactionType.Purchase, Date: '12/12/2021', UnitBlocks: 100.51, Amount: 50.33 }));
    input.Transactions.push(new Transaction({ ReferenceIDNumber: "abc", FundName: "aaa",  TransactionType: TransactionType.Dispose, Date: '12/12/2021', UnitBlocks: 100.51, Amount: 50.33 }));
    let result = Form8621Calculator.Compile(input);
    console.log(result);
}