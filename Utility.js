var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Purchase"] = 0] = "Purchase";
    TransactionType[TransactionType["Dispose"] = 1] = "Dispose";
})(TransactionType || (TransactionType = {}));
var FundType;
(function (FundType) {
    FundType[FundType["Section1291"] = 0] = "Section1291";
})(FundType || (FundType = {}));
var Transaction = /** @class */ (function () {
    function Transaction(referenceIDNumber, fundName, transactionType, date, numberOfUnits, amount) {
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.TransactionType = transactionType;
        this.Date = date;
        this.NumberOfUnits = numberOfUnits;
        this.Amount = amount;
    }
    return Transaction;
}());
var Input8621 = /** @class */ (function () {
    function Input8621() {
    }
    return Input8621;
}());
var UnitBlockYearDetail = /** @class */ (function () {
    function UnitBlockYearDetail() {
    }
    return UnitBlockYearDetail;
}());
var RefernceIDYearDetail = /** @class */ (function () {
    function RefernceIDYearDetail() {
    }
    return RefernceIDYearDetail;
}());
var UnitBlock = /** @class */ (function () {
    function UnitBlock() {
    }
    return UnitBlock;
}());
var ExcessDistributionSummary = /** @class */ (function () {
    function ExcessDistributionSummary() {
    }
    return ExcessDistributionSummary;
}());
var RefernceIDDetail = /** @class */ (function () {
    function RefernceIDDetail() {
    }
    return RefernceIDDetail;
}());
var Output8621 = /** @class */ (function () {
    function Output8621() {
    }
    return Output8621;
}());
var Form8621Calculator = /** @class */ (function () {
    function Form8621Calculator() {
    }
    Form8621Calculator.prototype.GetBlocks = function (transactions) {
        var arrayUnitBlocks = [];
        var PurchaseTransactions;
        transactions.sort().forEach(function (transaction) {
            if (transaction.TransactionType == TransactionType.Purchase) {
                PurchaseTransactions.push([transaction, transaction.NumberOfUnits]);
            }
            else {
                var UnitsToDispose_1 = transaction.NumberOfUnits;
                PurchaseTransactions.forEach(function (purchaseTransactionUnitTuple) {
                    if (UnitsToDispose_1 > 0) {
                        var purchaseTransaction = purchaseTransactionUnitTuple[0];
                        var remainingPurchaseUnitsInPurchaseTransaction = purchaseTransactionUnitTuple[1];
                        if (remainingPurchaseUnitsInPurchaseTransaction > 0) {
                            var unitBlock = new UnitBlock();
                            if (remainingPurchaseUnitsInPurchaseTransaction >= UnitsToDispose_1) {
                                unitBlock.NumberOfUnits = transaction.NumberOfUnits;
                                purchaseTransactionUnitTuple[1] -= transaction.NumberOfUnits;
                                UnitsToDispose_1 = 0;
                            }
                            else {
                                unitBlock.NumberOfUnits = remainingPurchaseUnitsInPurchaseTransaction;
                                UnitsToDispose_1 -= remainingPurchaseUnitsInPurchaseTransaction;
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
        });
        return arrayUnitBlocks;
    };
    Form8621Calculator.prototype.Compile = function (input) {
        var _this = this;
        var result = new Output8621();
        result.TaxYear = input.TaxYear;
        var lstReferenceIDNumbers = [];
        input.Transactions.forEach(function (transaction) {
            lstReferenceIDNumbers.push(transaction.ReferenceIDNumber);
        });
        lstReferenceIDNumbers.forEach(function (referenceIDNumber) {
            var lstTransactions = input.Transactions.filter(function (t) { return t.ReferenceIDNumber == referenceIDNumber; });
            var refernceIDDetail = new RefernceIDDetail();
            refernceIDDetail.ReferenceIDNumber = referenceIDNumber;
            refernceIDDetail.UnitBlocks = _this.GetBlocks(lstTransactions);
            result.RefernceIDDetails.push(refernceIDDetail);
        });
        return result;
    };
    return Form8621Calculator;
}());
var message = 'Hello World';
console.log(message);
//function Test()
{
    var input = new Input8621();
    var calculator = new Form8621Calculator();
    input.TaxYear = 2022;
    input.USPersonSince = -1;
    input.FundType = FundType.Section1291;
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Purchase, new Date('12/12/2021'), 100.51, 50.33));
    input.Transactions.push(new Transaction("abc", "aaa", TransactionType.Dispose, new Date('12/12/2021'), 100.51, 50.33));
    var result = calculator.Compile(input);
    console.log(result);
}
//# sourceMappingURL=Utility.js.map