"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form8621 = void 0;
class Form8621 {
    TaxYear;
    ReferenceIDNumber;
    FundName;
    //Total Gain
    Line15f;
    //Part of gain allotcated to current year or pre-PFIC
    Line16b;
    //Increase in tax for prior years
    Line16c;
    //Foreign Tax Credit
    Line16d;
    //additional tax after subtracting foreign tax credit
    Line16e;
    //interest
    Line16f;
    constructor(taxYear, referenceIDNumber, fundName) {
        this.TaxYear = taxYear;
        this.ReferenceIDNumber = referenceIDNumber;
        this.FundName = fundName;
        this.Line15f = 0;
        this.Line16b = 0;
        this.Line16c = 0;
        this.Line16d = 0;
        this.Line16e = 0;
        this.Line16f = 0;
    }
}
exports.Form8621 = Form8621;
//# sourceMappingURL=Form8621.js.map