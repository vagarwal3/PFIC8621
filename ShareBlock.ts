class ShareBlockYearDetail 
{
    Year: number;
    NumberOfDays: number;
    Line16c: number;
    IsResident: boolean;
    constructor(year: number) {
        this.Year = year;
    }
}
class ShareBlock 
{
    NumberOfUnits: number;
    PurchaseDate: Date;
    PurchaseAmount: number;
    DisposeDate: Date;
    DisposeAmount: number;
    ShareBlockYearDetails: ShareBlockYearDetail[];
    Line16B: number;
    constructor(taxYear: number, numberOfUnits, purchaseDate: Date, purchaseAmount: number, disposeDate: Date, disposeAmount: number) 
    {
        this.NumberOfUnits=numberOfUnits;
        this.ShareBlockYearDetails = [];
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfDays: number = 0;
        for (let year = purchaseYear; year <= disposeYear; year++) 
        {
            let shareBlockYearDetail: ShareBlockYearDetail = new ShareBlockYearDetail(year);
            let holdingStartDateInYear: Date;
            let holdingEndDateInYear: Date;
            if (year == purchaseYear) 
            {
                holdingStartDateInYear = purchaseDate;
            }
            else {
                holdingStartDateInYear = new Date(year, 0, 1);
            }
            if (year == disposeYear) 
            {
                holdingEndDateInYear = disposeDate;
            }
            else 
            {
                holdingEndDateInYear = new Date(year, 11, 31);
            }
            let numberOfDays: number = 0;
            let day: Date = holdingStartDateInYear;
            while (day < holdingEndDateInYear) 
            {
                numberOfDays++;
                day.setDate(day.getDate() + 1);
            }
            shareBlockYearDetail.NumberOfDays = numberOfDays;
            totalNumberOfDays += numberOfDays;
            this.ShareBlockYearDetails.push(shareBlockYearDetail);
        }
        let profit: number = disposeAmount - purchaseAmount;
        this.ShareBlockYearDetails.forEach(shareBlockYearDetail => 
            {
            let profitInYear = profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays;
            shareBlockYearDetail.Line16c = profit * shareBlockYearDetail.NumberOfDays / totalNumberOfDays;
            if (shareBlockYearDetail.Year == taxYear) 
            {
                this.Line16B += profitInYear;
            }
            else 
            {
                shareBlockYearDetail.Line16c = profitInYear;
            }
        });

    }
}