"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareBlock = exports.YearlyGainAllocation = void 0;
const Utility_1 = require("./Utility");
class YearlyGainAllocation {
    Year;
    NumberOfDays;
    GainAllocation;
    constructor(year, numberofDays, gainAllocation) {
        this.Year = year;
        this.NumberOfDays = numberofDays;
        this.GainAllocation = gainAllocation;
    }
}
exports.YearlyGainAllocation = YearlyGainAllocation;
class ShareBlock {
    NumberOfUnits;
    PurchaseDate;
    PurchaseAmount;
    DisposeDate;
    DisposeAmount;
    Gain;
    YearlyGainAllocations;
    constructor(taxYear, numberOfUnits, purchaseDate, purchaseAmount, disposeDate, disposeAmount) {
        let gain = Utility_1.Utility.ConvertNumberTo2DecimalPlace(disposeAmount - purchaseAmount);
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfShareHoldingDays = Utility_1.Utility.DateDifInDays(purchaseDate, disposeDate, true);
        this.NumberOfUnits = numberOfUnits;
        this.PurchaseAmount = purchaseAmount;
        this.PurchaseDate = purchaseDate;
        this.DisposeAmount = disposeAmount;
        this.DisposeDate = disposeDate;
        this.Gain = gain;
        this.YearlyGainAllocations = new Map();
        for (let year = purchaseYear; year <= disposeYear; year++) {
            let holdingStartDateInYear;
            let holdingEndDateInYear;
            if (year == purchaseYear) {
                holdingStartDateInYear = purchaseDate;
            }
            else {
                holdingStartDateInYear = Utility_1.Utility.GetFirstDateOfYear(year);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = Utility_1.Utility.GetLastDateOfYear(year);
            }
            let numberOfShareHoldingDaysInYear = Utility_1.Utility.DateDifInDays(holdingStartDateInYear, holdingEndDateInYear, true);
            let gainAlocation = Utility_1.Utility.ConvertNumberTo2DecimalPlace(gain * numberOfShareHoldingDaysInYear / totalNumberOfShareHoldingDays);
            let yearlyGainAllocation = new YearlyGainAllocation(year, numberOfShareHoldingDaysInYear, gainAlocation);
            this.YearlyGainAllocations.set(year, yearlyGainAllocation);
        }
    }
}
exports.ShareBlock = ShareBlock;
//# sourceMappingURL=ShareBlock.js.map