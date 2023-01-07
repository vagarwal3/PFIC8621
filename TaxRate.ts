import TaxRates from './TaxRateByYear.json'

export class TaxRate
{
     GetTaxRateByYear(year:number):number
     {
        return TaxRates.find(a=>a.Year==year)?.Rate;
     }
}