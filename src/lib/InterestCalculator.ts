import AnnualInterestRates from '../data/InterestRate.json'
import { Utility } from './Utility';
import { Date } from './Date';

export class InterestCalculator {

  static GetInterestRateOnADate(date: Date):number
   {
    let quarter: number = date.GetQuarter();

    return AnnualInterestRates.find(x => x.Year == date.Year)?.QuaterlyInterestRate[quarter-1]??1;
  }
  static CalculateInterest(amount: number, startDate: Date, endDate: Date) {
    let interestfactor: number = 1;
    let date = startDate;
    date.AddOneDay();

    while (date.IsLessThanOrEqualTo(endDate)) {
      let interest: number = (InterestCalculator.GetInterestRateOnADate(date) * interestfactor) / (Date.GetNumberOfDaysInYear(date.Year) * 100);
      interestfactor = interestfactor + interest;
      date.AddOneDay();
    }
    return Utility.ConvertNumberTo2DecimalPlace((interestfactor - 1) * amount);
  }
}