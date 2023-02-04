export class Date {
    Year: number;
    Month: number;
    Day: number;
    constructor(year: number, month: number, day: number) {
        if (month > 12 || month < 1)
            throw new Error('Wrong month');
        this.Year = year;
        this.Month = month;
        this.Day = day;
    }
    static IsLeapYear(year: number): boolean {
        return year % 4 === 0;
    }
    static DateDifInDays(startDate: Date, endDate: Date, isInclusive: boolean) {
        let numberOfDays: number = 0;
        let day: Date = new Date(startDate.Year,startDate.Month,startDate.Day);
        if (!isInclusive)
            day.AddOneDay();
        while (day.IsLessThanOrEqualTo(endDate)) {
            if (day.IsFirstDayOfYear() && day.Year < endDate.Year) {
                numberOfDays += Date.GetNumberOfDaysInYear(day.Year);
                day.Year += 1;
            }
            else if (!day.IsFirstDayOfYear() && day.IsFirstDayOfMonth() && (day.Year < endDate.Year || day.Month < endDate.Month)) {
                numberOfDays += Date.GetNumberOfDaysInMonth(day.Year, day.Month);
                if (day.Month === 12) {
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
    static GetNumberOfDaysInMonth(year: number, month: number): number {
        if (month === 2) {
            return Date.IsLeapYear(year) ? 29 : 28;
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        }
        return 31;
    }
    static GetNumberOfDaysInYear(year: number) {
        return Date.IsLeapYear(year) ? 366 : 365;
    }
    GetQuarter(): number {
        if (this.Month < 4)
            return 1;
        if (this.Month < 7)
            return 2;
        if (this.Month < 10)
            return 3;
        return 4;

    }
    IsLessThanOrEqualTo(target: Date): boolean {
        if (this.Year !== target.Year) return this.Year < target.Year;
        if (this.Month !== target.Month) return this.Month < target.Month;
        return this.Day <= target.Day;
    }
    IsLastDayofYear(): boolean {
        return this.Month === 12 && this.Day === 31;
    }
    IsLastDayOfMonth(): boolean {
        return Date.GetNumberOfDaysInMonth(this.Year, this.Month) === this.Day;
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
    IsFirstDayOfMonth(): boolean {
        return this.Day === 1;
    }
    IsFirstDayOfYear(): boolean {
        return this.Month === 1 && this.Day === 1;
    }

    GetFirstDateOfYear() {
        return new Date(this.Year, 1, 1);
    }

    GetLastDateOfYear() {
        return new Date(this.Year, 12, 31);
    }
    toString():string
    {
        return this.Month.toString()+"/"+this.Day.toString()+"/"+this.Year.toString();
    }
    static parse(value:string):Date
    {
        return new Date(parseInt(value.split('-')[0]),parseInt(value.split('-')[1]),parseInt(value.split('-')[2]));
    }
}