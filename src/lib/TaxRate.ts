import TaxRates from './TaxRateByYear.json'

export class TaxRate
{
     static GetTaxRateByYear(year:number):number
     {
        return TaxRates.find(a=>a.Year==year)?.Rate;
     }
}