"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestCalculator = void 0;
const InterestRate_json_1 = __importDefault(require("./InterestRate.json"));
const Utility_1 = require("./Utility");
class InterestCalculator {
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    daysInYear(year) {
        var days = 0;
        for (var month = 1; month <= 12; month++) {
            days += this.daysInMonth(month, year);
        }
        return days;
    }
    GetInterestRateOnADate(date) {
        let year = date.getFullYear();
        let monthIndex = date.getMonth();
        let quarter = Math.floor(monthIndex / 3);
        return InterestRate_json_1.default.find(x => x.Year == year).QuaterlyInterestRate[quarter];
    }
    CalculateInterest(startDate, endDate, amount) {
        let interestfactor = 1;
        let date = startDate;
        date.setDate(date.getDate() + 1);
        while (date <= endDate) {
            let interest = (this.GetInterestRateOnADate(date) * interestfactor) / (this.daysInYear(date.getFullYear()) * 100);
            interestfactor = interestfactor + interest;
            date.setDate(date.getDate() + 1);
        }
        return Utility_1.Utility.ConvertNumberTo2DecimalPlace((interestfactor - 1) * amount);
    }
}
exports.InterestCalculator = InterestCalculator;
//# sourceMappingURL=InterestCalculator.js.map