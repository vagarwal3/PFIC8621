"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRate = void 0;
const TaxRateByYear_json_1 = __importDefault(require("./TaxRateByYear.json"));
class TaxRate {
    GetTaxRateByYear(year) {
        return TaxRateByYear_json_1.default.find(a => a.Year == year)?.Rate;
    }
}
exports.TaxRate = TaxRate;
//# sourceMappingURL=TaxRate.js.map