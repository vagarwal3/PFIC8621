"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
class Date {
    Year;
    Month;
    Day;
    constructor(year, month, day) {
        if (month > 12 || month < 1)
            throw new Error('Wrong month');
        this.Year = year;
        this.Month = month;
        this.Day = day;
    }
    static IsLeapYear(year) {
        return year % 4 == 0;
    }
    static DateDifInDays(startDate, endDate, isInclusive) {
        let numberOfDays = 0;
        let day = new Date(startDate.Year, startDate.Month, startDate.Day);
        if (!isInclusive)
            day.AddOneDay();
        while (day.IsLessThanOrEqualTo(endDate)) {
            if (day.IsFirstDayOfYear() && day.Year < endDate.Year) {
                numberOfDays += Date.GetNumberOfDaysInYear(day.Year);
                day.Year += 1;
            }
            else if (!day.IsFirstDayOfYear() && day.IsFirstDayOfMonth() && (day.Year < endDate.Year || day.Month < endDate.Month)) {
                numberOfDays += Date.GetNumberOfDaysInMonth(day.Year, day.Month);
                if (day.Month == 12) {
                    day.Year += 1;
                    day.Month = 1;
                }
                else
                    day.Month += 1;
            }
            else {
                numberOfDays++;
                day.AddOneDay();
            }
        }
        return numberOfDays;
    }
    static GetNumberOfDaysInMonth(year, month) {
        if (month == 2) {
            return Date.IsLeapYear(year) ? 29 : 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        return 31;
    }
    static GetNumberOfDaysInYear(year) {
        return Date.IsLeapYear(year) ? 366 : 365;
    }
    GetQuarter() {
        if (this.Month < 4)
            return 1;
        if (this.Month < 7)
            return 2;
        if (this.Month < 10)
            return 3;
        return 4;
    }
    IsLessThanOrEqualTo(target) {
        if (this.Year != target.Year)
            return this.Year < target.Year;
        if (this.Month != target.Month)
            return this.Month < target.Month;
        return this.Day <= target.Day;
    }
    IsLastDayofYear() {
        return this.Month == 12 && this.Day == 31;
    }
    IsLastDayOfMonth() {
        return Date.GetNumberOfDaysInMonth(this.Year, this.Month) == this.Day;
    }
    AddOneDay() {
        if (this.IsLastDayofYear()) {
            this.Year = this.Year + 1;
            this.Month = 1;
            this.Day = 1;
            return;
        }
        if (this.IsLastDayOfMonth()) {
            this.Month += 1;
            this.Day = 1;
            return;
        }
        this.Day += 1;
    }
    IsFirstDayOfMonth() {
        return this.Day == 1;
    }
    IsFirstDayOfYear() {
        return this.Month == 1 && this.Day == 1;
    }
    GetFirstDateOfYear() {
        return new Date(this.Year, 1, 1);
    }
    GetLastDateOfYear() {
        return new Date(this.Year, 12, 31);
    }
}
exports.Date = Date;
//# sourceMappingURL=Date.js.map