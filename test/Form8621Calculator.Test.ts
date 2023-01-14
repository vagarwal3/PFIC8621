import { assert, expect } from "chai";
import { Form8621Calculator, PFIC, FundType, ShareHoldingYear } from "../src/Form8621Calculator";
import { Transaction, TransactionType } from "../src/Transaction";
import { USPersonStatus } from "../src/USPersonStatus";
import { Date } from "../src/Date";
import { YearlyGainAllocation } from "../src/ShareBlock";

describe('Form8621Calculator no tax liability', () => {
    it('Compute is returning incorrect value', () => {

        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 1, 1), 100, 100));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Purchase, new Date(2022, 1, 1), 200, 200));
        transactions.push(new Transaction('Ref3', 'Sample Fund3', TransactionType.Purchase, new Date(2020, 1, 1), 300, 300));
        transactions.push(new Transaction('Ref3', 'Sample Fund3', TransactionType.Dispose, new Date(2021, 1, 1), 150, 150));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        let expectedResult = [];

        expect(PFICs).to.deep.equal(expectedResult);
    })
});

describe('Form8621Calculator no profit', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 2, 10), 100, 500));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 4, 9), 100, 500));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Purchase, new Date(2022, 2, 21), 100, 700));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Dispose, new Date(2022, 8, 10), 100, 700));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        var expectedResult: any = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareHoldingYears: {
                    2021: {
                        Year: 2021,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 0

                    }, 2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 0
                    }
                }
                ,
                ShareBlocks: [{
                    NumberOfUnits: 100,
                    PurchaseDate: { Year: 2021, Month: 2, Day: 10 },
                    PurchaseAmount: 500,
                    DisposeDate: { Year: 2022, Month: 4, Day: 9 },
                    DisposeAmount: 500,
                    Gain: 0,
                    YearlyGainAllocations: {
                        2021: {
                            Year: 2021,
                            NumberOfDays: 325,
                            GainAllocation: 0
                        },
                        2022: {
                            Year: 2022,
                            NumberOfDays: 99,
                            GainAllocation: 0
                        }
                    }

                }],
                TotalPurchaseAmount: 500,
                TotalDisposeAmount: 500,
                TotalGain: 0,
                TotalOtherIncome: 0,
                TotalIncreaseInTax: 0,
                TotalInterest: 0,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: 0,
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: null,
                    //Increase in tax for prior years
                    Line16c: null,
                    //Foreign Tax Credit
                    Line16d: null,
                    //additional tax after subtracting foreign tax credit
                    Line16e: null,
                    //interest
                    Line16f: null
                },
            },
            {
                ReferenceIDNumber: "Ref2",
                FundName: "Sample Fund2",
                ShareHoldingYears: {
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 0
                    }
                },
                ShareBlocks: [{
                    NumberOfUnits: 100,
                    PurchaseDate: { Year: 2022, Month: 2, Day: 21 },
                    PurchaseAmount: 700,
                    DisposeDate: { Year: 2022, Month: 8, Day: 10 },
                    DisposeAmount: 700,
                    Gain: 0,
                    YearlyGainAllocations: {
                        2022: {
                            Year: 2022,
                            NumberOfDays: 171,
                            GainAllocation: 0
                        }
                    }
                }],
                TotalPurchaseAmount: 700,
                TotalDisposeAmount: 700,
                TotalGain: 0,
                TotalOtherIncome: 0,
                TotalIncreaseInTax: 0,
                TotalInterest: 0,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref2",
                    FundName: "Sample Fund2",
                    Line15f: 0,
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: null,
                    //Increase in tax for prior years
                    Line16c: null,
                    //Foreign Tax Credit
                    Line16d: null,
                    //additional tax after subtracting foreign tax credit
                    Line16e: null,
                    //interest
                    Line16f: null
                },
            }
        ];
        for (let i = 0; i < PFICs.length; i++) {
            expect(Object.fromEntries(PFICs[i].ShareHoldingYears)).to.deep.equal(expectedResult[i].ShareHoldingYears);
            PFICs[i].ShareHoldingYears.clear();
            expectedResult[i].ShareHoldingYears = new Map<number, ShareHoldingYear>();
            for (let j = 0; j < PFICs[i].ShareBlocks.length; j++) {
                expect(Object.fromEntries(PFICs[i].ShareBlocks[j].YearlyGainAllocations)).to.deep.equal(expectedResult[i].ShareBlocks[j].YearlyGainAllocations);
                PFICs[i].ShareBlocks[j].YearlyGainAllocations.clear();
                expectedResult[i].ShareBlocks[j].YearlyGainAllocations = new Map<number, YearlyGainAllocation>();
            }
        }
        expect(PFICs).to.deep.equal(expectedResult);
    })
});


describe('Form8621Calculator same year profit', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2022, 1, 2), 55.5, 100));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 6, 10), 55.5, 220.66));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        var expectedResult: any = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareHoldingYears: {
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 120.66
                    }
                }
                ,
                ShareBlocks: [{
                    NumberOfUnits: 55.5,
                    PurchaseDate: { Year: 2022, Month: 1, Day: 2 },
                    PurchaseAmount: 100,
                    DisposeDate: { Year: 2022, Month: 6, Day: 10 },
                    DisposeAmount: 220.66,
                    Gain: 120.66,
                    YearlyGainAllocations: {
                        2022: {
                            Year: 2022,
                            NumberOfDays: 160,
                            GainAllocation: 120.66
                        }
                    }

                }],
                TotalPurchaseAmount: 100,
                TotalDisposeAmount: 220.66,
                TotalGain: 120.66,
                TotalOtherIncome: 120.66,
                TotalIncreaseInTax: 0,
                TotalInterest: 0,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: 120.66,
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: 120.66,
                    //Increase in tax for prior years
                    Line16c: 0,
                    //Foreign Tax Credit
                    Line16d: 0,
                    //additional tax after subtracting foreign tax credit
                    Line16e: 0,
                    //interest
                    Line16f: 0
                },
            }
        ];
        for (let i = 0; i < PFICs.length; i++) {
            expect(Object.fromEntries(PFICs[i].ShareHoldingYears)).to.deep.equal(expectedResult[i].ShareHoldingYears);
            PFICs[i].ShareHoldingYears.clear();
            expectedResult[i].ShareHoldingYears = new Map<number, ShareHoldingYear>();
            for (let j = 0; j < PFICs[i].ShareBlocks.length; j++) {
                expect(Object.fromEntries(PFICs[i].ShareBlocks[j].YearlyGainAllocations)).to.deep.equal(expectedResult[i].ShareBlocks[j].YearlyGainAllocations);
                PFICs[i].ShareBlocks[j].YearlyGainAllocations.clear();
                expectedResult[i].ShareBlocks[j].YearlyGainAllocations = new Map<number, YearlyGainAllocation>();
            }
        }
        expect(PFICs).to.deep.equal(expectedResult);





    })
});

describe('Form8621Calculator two year profit', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 3, 2), 220.20, 1067.22));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 6, 10), 180.45, 1543.40));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        var expectedResult: any = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareHoldingYears: {
                    2021: {
                        Year: 2021,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 437.75
                    },
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 231.08
                    }
                }
                ,
                ShareBlocks: [{
                    NumberOfUnits: 180.45,
                    PurchaseDate: { Year: 2021, Month: 3, Day: 2 },
                    PurchaseAmount: 874.57,
                    DisposeDate: { Year: 2022, Month: 6, Day: 10 },
                    DisposeAmount: 1543.40,
                    Gain: 668.83,
                    YearlyGainAllocations: {
                        2021: {
                            Year: 2021,
                            NumberOfDays: 305,
                            GainAllocation: 437.75
                        },
                        2022: {
                            Year: 2022,
                            NumberOfDays: 161,
                            GainAllocation: 231.08
                        }
                    }

                }],
                TotalPurchaseAmount: 874.57,
                TotalDisposeAmount: 1543.40,
                TotalGain: 668.83,
                TotalOtherIncome: 231.08,
                TotalIncreaseInTax: 161.97,
                TotalInterest: 9.34,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: 668.83,
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: 231.08,
                    //Increase in tax for prior years
                    Line16c: 161.97,
                    //Foreign Tax Credit
                    Line16d: 0,
                    //additional tax after subtracting foreign tax credit
                    Line16e: 161.97,
                    //interest
                    Line16f: 9.34
                },
            }
        ];
        for (let i = 0; i < PFICs.length; i++) {
            expect(Object.fromEntries(PFICs[i].ShareHoldingYears)).to.deep.equal(expectedResult[i].ShareHoldingYears);
            PFICs[i].ShareHoldingYears.clear();
            expectedResult[i].ShareHoldingYears = new Map<number, ShareHoldingYear>();
            for (let j = 0; j < PFICs[i].ShareBlocks.length; j++) {
                expect(Object.fromEntries(PFICs[i].ShareBlocks[j].YearlyGainAllocations)).to.deep.equal(expectedResult[i].ShareBlocks[j].YearlyGainAllocations);
                PFICs[i].ShareBlocks[j].YearlyGainAllocations.clear();
                expectedResult[i].ShareBlocks[j].YearlyGainAllocations = new Map<number, YearlyGainAllocation>();
            }
        }
        expect(PFICs).to.deep.equal(expectedResult);





    })
});


// describe('Form8621Calculator two year profit', () => {
//     it('Compute is returning incorrect value', () => {
//         let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
//         let transactions: Transaction[] = []

//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2017, 0, 3), 145.56, 625.36));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2018, 2, 5), 278, 766.25));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2019, 6, 4), 180, 560.25));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2020, 8, 4), 132.67, 899.25));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 1, 1), 280.7, 1570.9));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 7, 5), 185.89, 688.3));


//         let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);
//         let expectedResult = [{
//             ReferenceIDNumber: "Ref1",
//             FundName: "Sample Fund1",
//             ShareBlocks:
//                 [
//                     {
//                         NumberOfUnits: 12.89,
//                         PurchaseDate: "1/3/2017",
//                         PurchaseAmount: 55.38,
//                         Profit: 16.76,
//                         DisposeDate: "2/1/2022",
//                         DisposeAmount: 72.14,
//                         ShareBlockYearDetails:
//                             [
//                                 {
//                                     Year: 2017,
//                                     NumberOfDays: 363,
//                                     ProfitAlocation: 3.28,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2018,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2019,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2020,
//                                     NumberOfDays: 366,
//                                     ProfitAlocation: 3.31,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }, {
//                                     Year: 2021,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2022,
//                                     NumberOfDays: 31,
//                                     ProfitAlocation: 0.28,
//                                     IsCurrentTaxYear: true,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }
//                             ],
//                         Line16B: 1,
//                     },
//                     {
//                         NumberOfUnits: 267.81,
//                         PurchaseDate: "3/5/2018",
//                         PurchaseAmount: 738.16,
//                         Profit: 760.60,
//                         DisposeDate: "2/1/2022",
//                         DisposeAmount: 1498.76,
//                         ShareBlockYearDetails:
//                             [
//                                 {
//                                     Year: 2018,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2019,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2020,
//                                     NumberOfDays: 366,
//                                     ProfitAlocation: 3.31,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }, {
//                                     Year: 2021,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2022,
//                                     NumberOfDays: 31,
//                                     ProfitAlocation: 0.28,
//                                     IsCurrentTaxYear: true,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }
//                             ], Line16B: 1,
//                     },
//                     {
//                         NumberOfUnits: 10.19,
//                         PurchaseDate: "3/5/2018",
//                         PurchaseAmount: 28.09,
//                         Profit: 9.64,
//                         DisposeDate: "8/5/2022",
//                         DisposeAmount: 37.73,
//                         ShareBlockYearDetails:
//                             [
//                                 {
//                                     Year: 2018,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2019,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2020,
//                                     NumberOfDays: 366,
//                                     ProfitAlocation: 3.31,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }, {
//                                     Year: 2021,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2022,
//                                     NumberOfDays: 31,
//                                     ProfitAlocation: 0.28,
//                                     IsCurrentTaxYear: true,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }
//                             ], Line16B: 1,
//                     },
//                     {
//                         NumberOfUnits: 175.70,
//                         PurchaseDate: "7/4/2019",
//                         PurchaseAmount: 546.87,
//                         Profit: 103.70,
//                         DisposeDate: "8/5/2022",
//                         DisposeAmount: 650.57,
//                         ShareBlockYearDetails:
//                             [
//                                 {
//                                     Year: 2019,
//                                     NumberOfDays: 181,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2020,
//                                     NumberOfDays: 366,
//                                     ProfitAlocation: 3.31,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }, {
//                                     Year: 2021,
//                                     NumberOfDays: 365,
//                                     ProfitAlocation: 3.30,
//                                     IsCurrentTaxYear: false,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 },
//                                 {
//                                     Year: 2022,
//                                     NumberOfDays: 216,
//                                     ProfitAlocation: 0.28,
//                                     IsCurrentTaxYear: true,
//                                     IsUSPerson: true,
//                                     IsPrePFICYear: false
//                                 }
//                             ], Line16B: 1,
//                     }
//                 ],
//             PurchaseTotal: 1368.49,
//             DisposeTotal: 2259.20,
//             Line16bTotal: 1,
//             ReferenceIDYearDetail: {},
//             Form8621: {}
//         }];

//         expect(PFICs).to.deep.equal(expectedResult);
//     })
// });