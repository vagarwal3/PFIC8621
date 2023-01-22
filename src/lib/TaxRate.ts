import TaxRates from '../data/TaxRateByYear.json'

export class TaxRate
{
     static GetTaxRateByYear(year:number):number
     {
        return TaxRates.find(a=>a.Year==year)?.Rate??1;
     }
}