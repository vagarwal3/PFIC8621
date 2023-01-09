"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareBlock = exports.YearlyGainAllocation = void 0;
const Utility_1 = require("./Utility");
const Date_1 = require("./Date");
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
        let purchaseYear = purchaseDate.Year;
        let disposeYear = disposeDate.Year;
        let totalNumberOfShareHoldingDays = Date_1.Date.DateDifInDays(purchaseDate, disposeDate, true);
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
                holdingStartDateInYear = new Date_1.Date(year, 1, 1);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = new Date_1.Date(year, 12, 31);
            }
            let numberOfShareHoldingDaysInYear = Date_1.Date.DateDifInDays(holdingStartDateInYear, holdingEndDateInYear, true);
            let gainAlocation = Utility_1.Utility.ConvertNumberTo2DecimalPlace(gain * numberOfShareHoldingDaysInYear / totalNumberOfShareHoldingDays);
            let yearlyGainAllocation = new YearlyGainAllocation(year, numberOfShareHoldingDaysInYear, gainAlocation);
            this.YearlyGainAllocations.set(year, yearlyGainAllocation);
        }
    }
}
exports.ShareBlock = ShareBlock;
//# sourceMappingURL=ShareBlock.js.map