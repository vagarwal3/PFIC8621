import { Utility } from "./Utility";

export class ShareBlockYearDetail {
    Year: number;
    NumberOfDays: number;
    ProfitAlocation: number;
    IsCurrentTaxYear: boolean;
    IsUSPerson: boolean;
    IsPrePFICYear: boolean;
    GetLine16c()
    {
        if (!this.IsCurrentTaxYear && this.IsUSPerson && !this.IsPrePFICYear)
            return this.ProfitAlocation;
            else 
            return 0;

    }

    constructor(year: number) {
        this.Year = year;
    }
}
export class ShareBlock {
    NumberOfUnits: number;
    PurchaseDate: Date;
    PurchaseAmount: number;
    Profit: number;
    DisposeDate: Date;
    DisposeAmount: number;
    ShareBlockYearDetails: ShareBlockYearDetail[];
    Line16B: number;
    constructor(taxYear: number, usPersonSinceBirth:boolean, usPersonSinceYear:number|null, numberOfUnits:number, purchaseDate: Date, purchaseAmount: number, disposeDate: Date, disposeAmount: number) {
        this.Line16B=0;
        this.NumberOfUnits = numberOfUnits;
        this.PurchaseAmount=purchaseAmount;
        this.PurchaseDate=purchaseDate;
        this.DisposeAmount = disposeAmount;
        this.DisposeDate=disposeDate;
        this.Profit=Utility.ConvertNumberTo2DecimalPlace( disposeAmount-purchaseAmount);
        this.ShareBlockYearDetails = [];
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfDays: number = 0;
        for (let year = purchaseYear; year <= disposeYear; year++) {
            let shareBlockYearDetail: ShareBlockYearDetail = new ShareBlockYearDetail(year);
            shareBlockYearDetail.IsPrePFICYear = false;
            shareBlockYearDetail.IsCurrentTaxYear = (year==taxYear);
            shareBlockYearDetail.IsUSPerson = (usPersonSinceBirth || year>=usPersonSinceYear);
            let holdingStartDateInYear: Date;
            let holdingEndDateInYear: Date;
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
            let numberOfDays: number = 0;
            let day: Date = holdingStartDateInYear;
            while (day <= holdingEndDateInYear) {
                numberOfDays++;
                day.setDate(day.getDate() + 1);
            }
            shareBlockYearDetail.NumberOfDays = numberOfDays;
            totalNumberOfDays += numberOfDays;
            this.ShareBlockYearDetails.push(shareBlockYearDetail);
        }
        this.ShareBlockYearDetails.forEach(shareBlockYearDetail => {
            shareBlockYearDetail.ProfitAlocation = Utility.ConvertNumberTo2DecimalPlace(this.Profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays);
            if (shareBlockYearDetail.IsCurrentTaxYear || !shareBlockYearDetail.IsUSPerson || shareBlockYearDetail.IsPrePFICYear) {
                this.Line16B += shareBlockYearDetail.ProfitAlocation;
            }
        });
    }
}