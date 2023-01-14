export class Form8621
{
    TaxYear:number;
    ReferenceIDNumber: string;
    FundName: string;
    //Total Gain
    Line15f: string;
    //Part of gain allotcated to current year or pre-PFIC
    Line16b: string;
    //Increase in tax for prior years
    Line16c: string;
    //Foreign Tax Credit
    Line16d: string;
    //additional tax after subtracting foreign tax credit
    Line16e: string;
    //interest
    Line16f: string;
    constructor(taxYear:number,referenceIDNumber:string,fundName:string) 
    {
        this.TaxYear = taxYear;
        this.ReferenceIDNumber= referenceIDNumber;
        this.FundName=fundName;
        this.Line15f = "";
        this.Line16b = "";
        this.Line16c = "";
        this.Line16d = "";
        this.Line16e = "";
        this.Line16f = "";
    }
}