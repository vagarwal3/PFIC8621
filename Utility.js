"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
class Utility {
    static ConvertNumberTo2DecimalPlace(amount) {
        return parseFloat(amount.toFixed(2));
    }
    static DateDifInDays(startDate, endDate, isInclusive) {
        let numberOfDays = 0;
        for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
            if (isInclusive || day != startDate)
                numberOfDays++;
        }
        return numberOfDays;
    }
    static GetFirstDateOfYear(year) {
        return new Date(year, 0, 1);
    }
    static GetLastDateOfYear(year) {
        return new Date(year, 11, 31);
    }
    static daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    static daysInYear(year) {
        var days = 0;
        for (var month = 1; month <= 12; month++) {
            days += Utility.daysInMonth(month, year);
        }
        return days;
    }
}
exports.Utility = Utility;
//# sourceMappingURL=Utility.js.map