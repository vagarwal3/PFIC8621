"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareBlock = exports.ShareBlockYearDetail = void 0;
class ShareBlockYearDetail {
    Year;
    NumberOfDays;
    Line16c;
    IsResident;
    constructor(year) {
        this.Year = year;
    }
}
exports.ShareBlockYearDetail = ShareBlockYearDetail;
class ShareBlock {
    NumberOfUnits;
    PurchaseDate;
    PurchaseAmount;
    DisposeDate;
    DisposeAmount;
    ShareBlockYearDetails;
    Line16B;
    constructor(taxYear, numberOfUnits, purchaseDate, purchaseAmount, disposeDate, disposeAmount) {
        this.NumberOfUnits = numberOfUnits;
        this.ShareBlockYearDetails = [];
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfDays = 0;
        for (let year = purchaseYear; year <= disposeYear; year++) {
            let shareBlockYearDetail = new ShareBlockYearDetail(year);
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
            while (day < holdingEndDateInYear) {
                numberOfDays++;
                day.setDate(day.getDate() + 1);
            }
            shareBlockYearDetail.NumberOfDays = numberOfDays;
            totalNumberOfDays += numberOfDays;
            this.ShareBlockYearDetails.push(shareBlockYearDetail);
        }
        let profit = disposeAmount - purchaseAmount;
        this.ShareBlockYearDetails.forEach(shareBlockYearDetail => {
            let profitInYear = profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays;
            shareBlockYearDetail.Line16c = profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays;
            if (shareBlockYearDetail.Year == taxYear) {
                this.Line16B += profitInYear;
            }
            else {
                shareBlockYearDetail.Line16c = profitInYear;
            }
        });
    }
}
exports.ShareBlock = ShareBlock;
//# sourceMappingURL=ShareBlock.js.map