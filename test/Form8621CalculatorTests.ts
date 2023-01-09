import { assert, expect } from "chai";
import { Form8621Calculator, PFIC, FundType } from "../Form8621Calculator";
import { Transaction, TransactionType } from "../Transaction";
import { USPersonStatus } from "../USPersonStatus";
import { Date } from "../Date";

describe('Form8621Calculator no tax liability', () => {
    it('Compute is returning incorrect value', () => {

        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 1, 1), 100, 100));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Purchase, new Date(2022, 1, 1), 200, 200));
        transactions.push(new Transaction('Ref3', 'Sample Fund3', TransactionType.Purchase, new Date(2020, 1, 1), 300, 300));
        transactions.push(new Transaction('Ref3', 'Sample Fund3', TransactionType.Dispose, new Date(2021, 1, 1), 150, 150));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        let expectedResult =
            [
            ];

        expect(PFICs).to.deep.equal(expectedResult);
    })
});

describe('Form8621Calculator no profit', () => {
    it('Compute is returning incorrect value', () => {
        let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
        let transactions: Transaction[] = []

        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 1, 1), 100, 100));
        transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 4, 1), 100, 100));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Purchase, new Date(2022, 2, 21), 100, 100));
        transactions.push(new Transaction('Ref2', 'Sample Fund2', TransactionType.Dispose, new Date(2022, 8, 10), 100, 100));

        let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);

        let expectedResult = [
            {
                ReferenceIDNumber: "Ref1",
                FundName: "Sample Fund1",
                ShareBlocks: [{
                    TotalGain:0
                }],
                Form8621:{TaxYear:2022,ReferenceIDNumber:"Ref1",FundName: "Sample Fund1"},
                TotalGain:0
            },
            {
                ReferenceIDNumber: "Ref2",
                FundName: "Sample Fund2",
                ShareBlocks: [{
                    TotalGain:0
                }],
                Form8621:{TaxYear:2022,ReferenceIDNumber:"Ref2",FundName: "Sample Fund2"},
                TotalGain:0
            }
        ];

        expect(PFICs).to.deep.equal(expectedResult);
    })
});


// describe('Form8621Calculator same year profit', () => {
//     it('Compute is returning incorrect value', () => {
//         let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
//         let transactions: Transaction[] = []

//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2022, 1, 2), 100, 100));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 6, 10), 100, 200));

//         let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);


//         let expectedResult = [{
//             ReferenceIDNumber: "Ref1",
//             FundName: "Sample Fund1",
//             PurchaseTotal: 100,
//             DisposeTotal: 200,
//             ShareBlocks: [
//                 {
//                     NumberOfUnits: 100,
//                     PurchaseAmount: 100,
//                     PurchaseDate: new Date(2022, 1, 2),
//                     DisposeAmount: 200,
//                     DisposeDate: new Date(2022, 6, 10),
//                     Profit: 100,
//                     Line16B: 0,
//                     ShareBlockYearDetails: [{
//                         Year: 2022,
//                         ProfitAlocation: 100,
//                         NumberOfDays: 0,
//                         IsCurrentTaxYear: true,
//                         IsPrePFICYear: false,
//                         IsUSPerson: true
//                     }]
//                 }
//             ],
//             Form8621: {
//                 Line15f: 100,
//                 Line16b: 100,
//                 Line16c: 0,
//                 Line16d: 0,
//                 Line16e: 0,
//                 Line16f: 0
//             },
//             Line16bTotal: 1,
//             ReferenceIDYearDetail: [
//                 {
//                     Year: 2022,
//                     Interest: 0
//                 }
//             ]
//         }];

//         expect(PFICs).to.deep.equal(expectedResult);
//     })
// });

// describe('Form8621Calculator two year profit', () => {
//     it('Compute is returning incorrect value', () => {
//         let usPersonStatus: USPersonStatus = new USPersonStatus(true, null);
//         let transactions: Transaction[] = []

//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Purchase, new Date(2021, 1, 2), 100, 100));
//         transactions.push(new Transaction('Ref1', 'Sample Fund1', TransactionType.Dispose, new Date(2022, 6, 10), 100, 200));

//         let PFICs: PFIC[] = Form8621Calculator.Compute(2022, FundType.Section1291, usPersonStatus, transactions);


//     })
// });


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