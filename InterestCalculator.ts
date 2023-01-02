import { Console } from 'console';
import AnnualInterestRates from './InterestRate.json'
import { Utility } from './Utility';

export class InterestCalculator 
{
  daysInMonth(month: number, year: number) 
  {
    return new Date(year, month, 0).getDate();
  }

  daysInYear(year: number) 
  {
    var days = 0;

    for (var month = 1; month <= 12; month++) 
    {
      days += this.daysInMonth(month, year);
    }

    return days;
  }
  GetInterestRateOnADate(date: Date) 
  {
    let year: number = date.getFullYear();
    let monthIndex: number = date.getMonth();
    let quarter: number = Math.floor(monthIndex / 3);

    return AnnualInterestRates.find(x => x.Year == year).QuaterlyInterestRate[quarter];
  }
  CalculateInterest(startDate: Date, endDate: Date, amount: number) 
  {
    let interestfactor: number = 1;
    let date = startDate;
    date.setDate(date.getDate() + 1);

    while (date <= endDate) 
    {
      let interest: number = (this.GetInterestRateOnADate(date) * interestfactor) / (this.daysInYear(date.getFullYear()) * 100);
      interestfactor = interestfactor + interest;
      date.setDate(date.getDate() + 1);
    }
    return Utility.ConvertNumberTo2DecimalPlace((interestfactor - 1) * amount);
  }
}