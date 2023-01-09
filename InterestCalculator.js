"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestCalculator = void 0;
const InterestRate_json_1 = __importDefault(require("./InterestRate.json"));
const Utility_1 = require("./Utility");
const Date_1 = require("./Date");
class InterestCalculator {
    static GetInterestRateOnADate(date) {
        let quarter = date.GetQuarter();
        return InterestRate_json_1.default.find(x => x.Year == date.Year).QuaterlyInterestRate[quarter - 1];
    }
    static CalculateInterest(amount, startDate, endDate) {
        let interestfactor = 1;
        let date = startDate;
        date.AddOneDay();
        while (date.IsLessThanOrEqualTo(endDate)) {
            let interest = (InterestCalculator.GetInterestRateOnADate(date) * interestfactor) / (Date_1.Date.GetNumberOfDaysInYear(date.Year) * 100);
            interestfactor = interestfactor + interest;
            date.AddOneDay();
        }
        return Utility_1.Utility.ConvertNumberTo2DecimalPlace((interestfactor - 1) * amount);
    }
}
exports.InterestCalculator = InterestCalculator;
//# sourceMappingURL=InterestCalculator.js.map