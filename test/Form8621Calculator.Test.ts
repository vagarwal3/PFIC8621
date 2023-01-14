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
                    Line15f: "0",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "",
                    //Increase in tax for prior years
                    Line16c: "",
                    //Foreign Tax Credit
                    Line16d: "",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "",
                    //interest
                    Line16f: ""
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
                    Line15f: "0",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "",
                    //Increase in tax for prior years
                    Line16c: "",
                    //Foreign Tax Credit
                    Line16d: "",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "",
                    //interest
                    Line16f: ""
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
                    Line15f: "120.66",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "120.66",
                    //Increase in tax for prior years
                    Line16c: "0",
                    //Foreign Tax Credit
                    Line16d: "0",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "0",
                    //interest
                    Line16f: "0"
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
describe('Form8621Calculator same year loss', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2022, 1, 2), 55.5, 300));
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
                        TotalGain: -79.34
                    }
                }
                ,
                ShareBlocks: [{
                    NumberOfUnits: 55.5,
                    PurchaseDate: { Year: 2022, Month: 1, Day: 2 },
                    PurchaseAmount: 300,
                    DisposeDate: { Year: 2022, Month: 6, Day: 10 },
                    DisposeAmount: 220.66,
                    Gain: -79.34,
                    YearlyGainAllocations: {
                        2022: {
                            Year: 2022,
                            NumberOfDays: 160,
                            GainAllocation: -79.34
                        }
                    }

                }],
                TotalPurchaseAmount: 300,
                TotalDisposeAmount: 220.66,
                TotalGain: -79.34,
                TotalOtherIncome: 0,
                TotalIncreaseInTax: 0,
                TotalInterest: 0,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: "(79.34)",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "",
                    //Increase in tax for prior years
                    Line16c: "",
                    //Foreign Tax Credit
                    Line16d: "",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "",
                    //interest
                    Line16f: ""
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
                TotalInterest: 9.36,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: "668.83",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "231.08",
                    //Increase in tax for prior years
                    Line16c: "161.97",
                    //Foreign Tax Credit
                    Line16d: "0",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "161.97",
                    //interest
                    Line16f: "9.36"
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


describe('Form8621Calculator two year loss', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 3, 2), 220.20, 2067.22));
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
                        TotalGain: -98.60
                    },
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: -52.05
                    }
                }
                ,
                ShareBlocks: [{
                    NumberOfUnits: 180.45,
                    PurchaseDate: { Year: 2021, Month: 3, Day: 2 },
                    PurchaseAmount: 1694.05,
                    DisposeDate: { Year: 2022, Month: 6, Day: 10 },
                    DisposeAmount: 1543.40,
                    Gain: -150.65,
                    YearlyGainAllocations: {
                        2021: {
                            Year: 2021,
                            NumberOfDays: 305,
                            GainAllocation: -98.60
                        },
                        2022: {
                            Year: 2022,
                            NumberOfDays: 161,
                            GainAllocation: -52.05
                        }
                    }

                }],
                TotalPurchaseAmount: 1694.05,
                TotalDisposeAmount: 1543.40,
                TotalGain: -150.65,
                TotalOtherIncome: 0,
                TotalIncreaseInTax: 0,
                TotalInterest: 0,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: "(150.65)",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "",
                    //Increase in tax for prior years
                    Line16c: "",
                    //Foreign Tax Credit
                    Line16d: "",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "",
                    //interest
                    Line16f: ""
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

describe('Form8621Calculator multi year profit', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(false, 2018);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2018, 3, 6), 200.09, 6521.34));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2019, 1, 7), 30.67, 865.9));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2019, 8, 12), 70.2, 1645.65));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2020, 4, 2), 50.11, 1100));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2021, 2, 2), 20, 858.22));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 4, 21), 100.88, 3554.75));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 10, 11), 60.9, 2289.05));
        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        var expectedResult: any = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareHoldingYears: {
                    2018: {
                        Year: 2018,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 61.33
                    },
                    2019: {
                        Year: 2019,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 149.32
                    },
                    2020: {
                        Year: 2020,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 249.48
                    },
                    2021: {
                        Year: 2021,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 281.77
                    },
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 188.63
                    }
                }
                ,
                ShareBlocks: [
                    {
                        NumberOfUnits: 100.88,
                        PurchaseDate: { Year: 2018, Month: 3, Day: 6 },
                        PurchaseAmount: 3287.88,
                        DisposeDate: { Year: 2022, Month: 4, Day: 21 },
                        DisposeAmount: 3554.75,
                        Gain: 266.87,
                        YearlyGainAllocations: {
                            2018: {
                                Year: 2018,
                                NumberOfDays: 301,
                                GainAllocation: 53.27
                            },
                            2019: {
                                Year: 2019,
                                NumberOfDays: 365,
                                GainAllocation: 64.59
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 64.77
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 64.59
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 111,
                                GainAllocation: 19.64
                            }
                        }

                    },
                    {
                        NumberOfUnits: 9.01,
                        PurchaseDate: { Year: 2018, Month: 3, Day: 6 },
                        PurchaseAmount: 293.65,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 338.66,
                        Gain: 45.01,
                        YearlyGainAllocations: {
                            2018: {
                                Year: 2018,
                                NumberOfDays: 301,
                                GainAllocation: 8.06
                            },
                            2019: {
                                Year: 2019,
                                NumberOfDays: 365,
                                GainAllocation: 9.77
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 9.8
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 9.77
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 7.6
                            }
                        }

                    },
                    {
                        NumberOfUnits: 30.67,
                        PurchaseDate: { Year: 2019, Month: 1, Day: 7 },
                        PurchaseAmount: 865.90,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 1152.79,
                        Gain: 286.89,
                        YearlyGainAllocations: {
                            2019: {
                                Year: 2019,
                                NumberOfDays: 359,
                                GainAllocation: 74.96
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 76.42
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 76.21
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 59.30
                            }
                        }

                    },
                    {
                        NumberOfUnits: 21.22,
                        PurchaseDate: { Year: 2020, Month: 4, Day: 2 },
                        PurchaseAmount: 465.82,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 797.60,
                        Gain: 331.78,
                        YearlyGainAllocations: {
                            2020: {
                                Year: 2020,
                                NumberOfDays: 274,
                                GainAllocation: 98.49
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 131.20
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 102.09
                            }
                        }

                    },
                ],
                TotalPurchaseAmount: 4913.25,
                TotalDisposeAmount: 5843.80,
                TotalGain: 930.55,
                TotalOtherIncome: 188.63,
                TotalIncreaseInTax: 274.5,
                TotalInterest: 25.75,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: "930.55",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "188.63",
                    //Increase in tax for prior years
                    Line16c: "274.5",
                    //Foreign Tax Credit
                    Line16d: "0",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "274.5",
                    //interest
                    Line16f: "25.75"
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


describe('Form8621Calculator multi year profit with Pre-PFIC', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(false, 2020);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2018, 3, 6), 200.09, 6521.34));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2019, 1, 7), 30.67, 865.9));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2019, 8, 12), 70.2, 1645.65));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2020, 4, 2), 50.11, 1100));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2021, 2, 2), 20, 858.22));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 4, 21), 100.88, 3554.75));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 10, 11), 60.9, 2289.05));
        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        var expectedResult: any = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareHoldingYears: {
                    2018: {
                        Year: 2018,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: true,
                        TotalGain: 61.33
                    },
                    2019: {
                        Year: 2019,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: true,
                        TotalGain: 149.32
                    },
                    2020: {
                        Year: 2020,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 249.48
                    },
                    2021: {
                        Year: 2021,
                        TaxYear: 2022,
                        IsCurrentTaxYear: false,
                        IsPrePFICYear: false,
                        TotalGain: 281.77
                    },
                    2022: {
                        Year: 2022,
                        TaxYear: 2022,
                        IsCurrentTaxYear: true,
                        IsPrePFICYear: false,
                        TotalGain: 188.63
                    }
                }
                ,
                ShareBlocks: [
                    {
                        NumberOfUnits: 100.88,
                        PurchaseDate: { Year: 2018, Month: 3, Day: 6 },
                        PurchaseAmount: 3287.88,
                        DisposeDate: { Year: 2022, Month: 4, Day: 21 },
                        DisposeAmount: 3554.75,
                        Gain: 266.87,
                        YearlyGainAllocations: {
                            2018: {
                                Year: 2018,
                                NumberOfDays: 301,
                                GainAllocation: 53.27
                            },
                            2019: {
                                Year: 2019,
                                NumberOfDays: 365,
                                GainAllocation: 64.59
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 64.77
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 64.59
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 111,
                                GainAllocation: 19.64
                            }
                        }

                    },
                    {
                        NumberOfUnits: 9.01,
                        PurchaseDate: { Year: 2018, Month: 3, Day: 6 },
                        PurchaseAmount: 293.65,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 338.66,
                        Gain: 45.01,
                        YearlyGainAllocations: {
                            2018: {
                                Year: 2018,
                                NumberOfDays: 301,
                                GainAllocation: 8.06
                            },
                            2019: {
                                Year: 2019,
                                NumberOfDays: 365,
                                GainAllocation: 9.77
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 9.8
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 9.77
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 7.6
                            }
                        }

                    },
                    {
                        NumberOfUnits: 30.67,
                        PurchaseDate: { Year: 2019, Month: 1, Day: 7 },
                        PurchaseAmount: 865.90,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 1152.79,
                        Gain: 286.89,
                        YearlyGainAllocations: {
                            2019: {
                                Year: 2019,
                                NumberOfDays: 359,
                                GainAllocation: 74.96
                            },
                            2020: {
                                Year: 2020,
                                NumberOfDays: 366,
                                GainAllocation: 76.42
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 76.21
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 59.30
                            }
                        }

                    },
                    {
                        NumberOfUnits: 21.22,
                        PurchaseDate: { Year: 2020, Month: 4, Day: 2 },
                        PurchaseAmount: 465.82,
                        DisposeDate: { Year: 2022, Month: 10, Day: 11 },
                        DisposeAmount: 797.60,
                        Gain: 331.78,
                        YearlyGainAllocations: {
                            2020: {
                                Year: 2020,
                                NumberOfDays: 274,
                                GainAllocation: 98.49
                            },
                            2021: {
                                Year: 2021,
                                NumberOfDays: 365,
                                GainAllocation: 131.20
                            },
                            2022: {
                                Year: 2022,
                                NumberOfDays: 284,
                                GainAllocation: 102.09
                            }
                        }

                    },
                ],
                TotalPurchaseAmount: 4913.25,
                TotalDisposeAmount: 5843.80,
                TotalGain: 930.55,
                TotalOtherIncome: 399.28,
                TotalIncreaseInTax: 196.56,
                TotalInterest: 14.38,
                Form8621: {
                    TaxYear: 2022,
                    ReferenceIDNumber: "Ref1",
                    FundName: "Sample Fund1",
                    Line15f: "930.55",
                    //Part of gain allotcated to current year or pre-PFIC
                    Line16b: "399.28",
                    //Increase in tax for prior years
                    Line16c: "196.56",
                    //Foreign Tax Credit
                    Line16d: "0",
                    //additional tax after subtracting foreign tax credit
                    Line16e: "196.56",
                    //interest
                    Line16f: "14.38"
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