"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareBlock = exports.ShareBlockYearDetail = void 0;
const Utility_1 = require("./Utility");
class ShareBlockYearDetail {
    Year;
    NumberOfDays;
    ProfitAlocation;
    IsCurrentTaxYear;
    IsUSPerson;
    IsPrePFICYear;
    IsCurrentOrPrePFICYear() {
        if (this.IsCurrentTaxYear || !this.IsUSPerson || this.IsPrePFICYear)
            return true;
        else
            false;
    }
    GetLine16b() {
        if (this.IsCurrentOrPrePFICYear())
            return this.ProfitAlocation;
        else
            return 0;
    }
    GetLine16c() {
        if (!this.IsCurrentOrPrePFICYear())
            return this.ProfitAlocation;
        else
            return 0;
    }
    constructor(year) {
        this.Year = year;
    }
}
exports.ShareBlockYearDetail = ShareBlockYearDetail;
class ShareBlock {
    NumberOfUnits;
    PurchaseDate;
    PurchaseAmount;
    Profit;
    DisposeDate;
    DisposeAmount;
    ShareBlockYearDetails;
    Line16B;
    PriorYearProfitSum;
    constructor(taxYear, usPersonSinceBirth, usPersonSinceYear, numberOfUnits, purchaseDate, purchaseAmount, disposeDate, disposeAmount) {
        this.Line16B = 0;
        this.PriorYearProfitSum = 0;
        this.NumberOfUnits = numberOfUnits;
        this.PurchaseAmount = purchaseAmount;
        this.PurchaseDate = purchaseDate;
        this.DisposeAmount = disposeAmount;
        this.DisposeDate = disposeDate;
        this.Profit = Utility_1.Utility.ConvertNumberTo2DecimalPlace(disposeAmount - purchaseAmount);
        this.ShareBlockYearDetails = [];
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfDays = 0;
        for (let year = purchaseYear; year <= disposeYear; year++) {
            let shareBlockYearDetail = new ShareBlockYearDetail(year);
            shareBlockYearDetail.IsPrePFICYear = false;
            shareBlockYearDetail.IsCurrentTaxYear = (year == taxYear);
            shareBlockYearDetail.IsUSPerson = (usPersonSinceBirth || year >= usPersonSinceYear);
            let holdingStartDateInYear;
            let holdingEndDateInYear;
            if (year == purchaseYear) {
                holdingStartDateInYear = purchaseDate;
            }
            else {
                holdingStartDateInYear = new Date(year, 0, 1);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = new Date(year, 11, 31);
            }
            let numberOfDays = 0;
            let day = holdingStartDateInYear;
            while (day <= holdingEndDateInYear) {
                numberOfDays++;
                day.setDate(day.getDate() + 1);
            }
            shareBlockYearDetail.NumberOfDays = numberOfDays;
            totalNumberOfDays += numberOfDays;
            this.ShareBlockYearDetails.push(shareBlockYearDetail);
        }
        this.ShareBlockYearDetails.forEach(shareBlockYearDetail => {
            shareBlockYearDetail.ProfitAlocation = Utility_1.Utility.ConvertNumberTo2DecimalPlace(this.Profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays);
            if (shareBlockYearDetail.IsCurrentOrPrePFICYear()) {
                this.Line16B += shareBlockYearDetail.ProfitAlocation;
            }
            else {
                this.PriorYearProfitSum += shareBlockYearDetail.ProfitAlocation;
            }
        });
    }
}
exports.ShareBlock = ShareBlock;
//# sourceMappingURL=ShareBlock.js.map