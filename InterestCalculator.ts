import AnnualInterestRates from './InterestRate.json'
import { Utility } from './Utility';

export class InterestCalculator {

  static GetInterestRateOnADate(date: Date) {
    let year: number = date.getFullYear();
    let monthIndex: number = date.getMonth();
    let quarter: number = Math.floor(monthIndex / 3);

    return AnnualInterestRates.find(x => x.Year == year).QuaterlyInterestRate[quarter];
  }
  static CalculateInterest(amount: number, startDate: Date, endDate: Date) {
    let interestfactor: number = 1;
    let date = startDate;
    date.setDate(date.getDate() + 1);

    while (date <= endDate) {
      let interest: number = (InterestCalculator.GetInterestRateOnADate(date) * interestfactor) / (Utility.daysInYear(date.getFullYear()) * 100);
      interestfactor = interestfactor + interest;
      date.setDate(date.getDate() + 1);
    }
    return Utility.ConvertNumberTo2DecimalPlace((interestfactor - 1) * amount);
  }
}