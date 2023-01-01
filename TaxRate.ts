import TaxRates from './TaxRateByYear.json'

export class TaxRate
{
     GetTaxRateByYear(year)
     {
        return TaxRates.find(a=>a.Year==year)?.Rate;
     }
}