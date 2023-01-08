export class Form8621
{
    TaxYear:number;
    ReferenceIDNumber: string;
    FundName: string;
    //Total Gain
    Line15f: number;
    //Part of gain allotcated to current year or pre-PFIC
    Line16b: number;
    //Increase in tax for prior years
    Line16c: number;
    //Foreign Tax Credit
    Line16d: number;
    //additional tax after subtracting foreign tax credit
    Line16e: number;
    //interest
    Line16f: number;
    constructor(taxYear:number,referenceIDNumber:string,fundName:string) 
    {
        this.TaxYear = taxYear;
        this.ReferenceIDNumber= referenceIDNumber;
        this.FundName=fundName;
        this.Line15f = 0;
        this.Line16b = 0;
        this.Line16c = 0;
        this.Line16d = 0;
        this.Line16e = 0;
        this.Line16f = 0;
    }
}