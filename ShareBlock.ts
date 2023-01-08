import { Utility } from "./Utility";

export class YearlyGainAllocation {
    Year: number;
    NumberOfDays: number;
    GainAllocation: number;

    constructor(year: number, numberofDays, gainAllocation) {
        this.Year = year;
        this.NumberOfDays = numberofDays;
        this.GainAllocation = gainAllocation;
    }
}
export class ShareBlock {
    NumberOfUnits: number;
    PurchaseDate: Date;
    PurchaseAmount: number;
    DisposeDate: Date;
    DisposeAmount: number;
    Gain: number;
    YearlyGainAllocations: Map<number, YearlyGainAllocation>;

    constructor(taxYear: number, numberOfUnits: number, purchaseDate: Date, purchaseAmount: number, disposeDate: Date, disposeAmount: number) {
        // this.Line16B = 0;
        //this.PriorYearProfitSum = 0;
        let gain: number = Utility.ConvertNumberTo2DecimalPlace(disposeAmount - purchaseAmount);
        let purchaseYear = purchaseDate.getFullYear();
        let disposeYear = disposeDate.getFullYear();
        let totalNumberOfShareHoldingDays: number = Utility.DateDifInDays(purchaseDate, disposeDate, true);

        this.NumberOfUnits = numberOfUnits;
        this.PurchaseAmount = purchaseAmount;
        this.PurchaseDate = purchaseDate;
        this.DisposeAmount = disposeAmount;
        this.DisposeDate = disposeDate;
        this.Gain = gain;
        this.YearlyGainAllocations = new Map<number, YearlyGainAllocation>();
        for (let year = purchaseYear; year <= disposeYear; year++) {

            let holdingStartDateInYear: Date;
            let holdingEndDateInYear: Date;
            if (year == purchaseYear) {
                holdingStartDateInYear = purchaseDate;
            }
            else {
                holdingStartDateInYear = Utility.GetFirstDateOfYear(year);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = Utility.GetLastDateOfYear(year);
            }
            let numberOfShareHoldingDaysInYear: number = Utility.DateDifInDays(holdingStartDateInYear, holdingEndDateInYear, true);
            let gainAlocation: number = Utility.ConvertNumberTo2DecimalPlace(gain * numberOfShareHoldingDaysInYear / totalNumberOfShareHoldingDays);
            let yearlyGainAllocation: YearlyGainAllocation = new YearlyGainAllocation(year, numberOfShareHoldingDaysInYear, gainAlocation);
            this.YearlyGainAllocations.set(year, yearlyGainAllocation);
        }
    }
}