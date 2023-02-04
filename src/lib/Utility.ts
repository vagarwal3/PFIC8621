export class Utility {
  
  static ConvertNumberTo2DecimalPlace(amount: number) {
    return parseFloat(amount.toFixed(2));
  }
  static ConvertNumberTo4DecimalPlace(amount: number) {
    return parseFloat(amount.toFixed(4));
  }
  static FormatCurrency(amount: number, showCurrencySymbol:boolean) {
    if (amount<0)
      return "("+(-1*parseFloat(amount.toFixed(2))).toString()+")";  
    return parseFloat(amount.toFixed(2)).toString();
  }
  
  static DateDifInDays(startDate: Date, endDate: Date, isInclusive: boolean) {
    let numberOfDays: number = 0;
    for (let day: Date = startDate; day <= endDate; ) {
      if (isInclusive || day !== startDate)
        numberOfDays++;
      day.setDate(day.getDate() + 1)
    }
    return numberOfDays;
  }
  
  static GetFirstDateOfYear(year:number)
  {
    return new Date(year, 0, 1);
  }
  
  static GetLastDateOfYear(year:number)
  {
    return new Date(year, 11, 31);
  }

  static daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  static daysInYear(year: number) {
    var days = 0;

    for (var month = 1; month <= 12; month++) {
      days += Utility.daysInMonth(month, year);
    }

    return days;
  }
}
