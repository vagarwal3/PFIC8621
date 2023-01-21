import { Utility } from "./Utility";
import {Date} from "./Date"

export class YearlyGainAllocation {
    Year: number;
    NumberOfDays: number;
    GainAllocation: number;

    constructor(year: number, numberofDays: number, gainAllocation:number) {
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
        let gain: number = Utility.ConvertNumberTo2DecimalPlace(disposeAmount - purchaseAmount);
        let purchaseYear = purchaseDate.Year;
        let disposeYear = disposeDate.Year;
        let totalNumberOfShareHoldingDays: number = Date.DateDifInDays(purchaseDate, disposeDate, true);

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
                holdingStartDateInYear = new Date(year,1,1);
            }
            if (year == disposeYear) {
                holdingEndDateInYear = disposeDate;
            }
            else {
                holdingEndDateInYear = new Date(year,12,31)
            }
            let numberOfShareHoldingDaysInYear: number = Date.DateDifInDays(holdingStartDateInYear, holdingEndDateInYear, true);
            let gainAlocation: number = Utility.ConvertNumberTo2DecimalPlace(gain * numberOfShareHoldingDaysInYear / totalNumberOfShareHoldingDays);
            let yearlyGainAllocation: YearlyGainAllocation = new YearlyGainAllocation(year, numberOfShareHoldingDaysInYear, gainAlocation);
            this.YearlyGainAllocations.set(year, yearlyGainAllocation);
        }
    }
}