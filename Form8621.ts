export class Form8621
{
    TaxYear:number;
    ReferenceIDNumber: string;
    FundName: string;
    //Total Gain
    Field15f: number;
    //Part of gain allotcated to current year or pre-PFIC
    Field16b: number;
    //Increase in tax for prior years
    Field16c: number;
    //Foreign Tax Credit
    Field16d: number;
    //additional tax after subtracting foreign tax credit
    Field16e: number;
    //interest
    Field16f: number;
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