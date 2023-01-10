import { assert, expect } from "chai";
import { ShareBlock, YearlyGainAllocation } from "../src/ShareBlock"
import { Date } from "../src/Date";

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 1, 1), 100, new Date(2022, 1, 1), 100);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:1,Month:1,Year:2022},
            PurchaseAmount: 100,
            DisposeDate: {Day:1,Month:1,Year:2022},
            DisposeAmount: 100,
            Gain: 0,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 0 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);

    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 1, 1), 100, new Date(2022, 1, 1), 101);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:1,Month:1,Year:2022},
            PurchaseAmount: 100,
            DisposeDate: {Day:1,Month:1,Year:2022},
            DisposeAmount: 101,
            Gain: 1,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 1 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 2, 14), 78.9, new Date(2022, 2, 14), 200.78);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:14,Month:2,Year:2022},
            PurchaseAmount: 78.9,
            DisposeDate: {Day:14,Month:2,Year:2022},
            DisposeAmount: 200.78,
            Gain: 121.88,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 121.88 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 1, 1), 1000, new Date(2022, 1, 2), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:1,Month:1,Year:2022},
            PurchaseAmount: 1000,
            DisposeDate: {Day:2,Month:1,Year:2022},
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2022, NumberOfDays: 2, GainAllocation: 1000 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 3, 14), 1000, new Date(2022, 7, 23), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:14,Month:3,Year:2022},
            PurchaseAmount: 1000,
            DisposeDate: {Day:23,Month:7,Year:2022},
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2022, NumberOfDays: 132, GainAllocation: 1000 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2021, 3, 14), 1000, new Date(2022, 7, 12), 2000);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:14,Month:3,Year:2021},
            PurchaseAmount: 1000,
            DisposeDate: {Day:12,Month:7,Year:2022},
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2021, NumberOfDays: 293, GainAllocation: 602.88 },
                { Year: 2022, NumberOfDays: 193, GainAllocation: 397.12 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct1', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 5, 10), 1014.10, new Date(2022, 7, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:10,Month:5,Year:2020},
            PurchaseAmount: 1014.10,
            DisposeDate: {Day:26,Month:7,Year:2022},
            DisposeAmount: 2056.90,
            Gain: 1042.8,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2020, NumberOfDays: 236, GainAllocation: 304.58 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 471.07 },
                { Year: 2022, NumberOfDays: 207, GainAllocation: 267.15 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2019, 12, 10), 1024.21, new Date(2022, 11, 30), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Day:10,Month:12,Year:2019},
            PurchaseAmount: 1024.21,
            DisposeDate: {Day:30,Month:11,Year:2022},
            DisposeAmount: 2056.90,
            Gain: 1032.69,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2019, NumberOfDays: 22, GainAllocation: 20.90 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 347.71 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 346.76 },
                { Year: 2022, NumberOfDays: 334, GainAllocation: 317.31 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 78, new Date(2018, 8, 14), 1034, new Date(2022, 12, 1), 3056.80);
        let expectedResult = {
            NumberOfUnits: 78,
            PurchaseDate: {Day:14,Month:8,Year:2018},
            PurchaseAmount: 1034,
            DisposeDate: {Day:1,Month:12,Year:2022},
            DisposeAmount: 3056.80,
            Gain: 2022.80,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2018, NumberOfDays: 140, GainAllocation: 180.26 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 469.97 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 471.26 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 469.97 },
                { Year: 2022, NumberOfDays: 335, GainAllocation: 431.34 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2017, 6, 11), 1704.78, new Date(2022, 5, 12), 4456.89);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Year:2017, Month:6, Day:11},
            PurchaseAmount: 1704.78,
            DisposeDate: {Year:2022, Month:5, Day:12},
            DisposeAmount: 4456.89,
            Gain: 2752.11,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2017, NumberOfDays: 204, GainAllocation: 312.43 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 560.53 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2022, NumberOfDays: 132, GainAllocation: 202.16 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2016, 5, 10), 1014.71, new Date(2022, 11, 20), 2206.50);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Year:2016,Month:5,Day:10},
            PurchaseAmount: 1014.71,
            DisposeDate: {Year:2022,Month:11,Day:20},
            DisposeAmount: 2206.50,
            Gain: 1191.79,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2016, NumberOfDays: 236, GainAllocation: 117.88 },
                { Year: 2017, NumberOfDays: 365, GainAllocation: 182.31 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 182.31 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 182.31 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 182.81 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 182.31 },
                { Year: 2022, NumberOfDays: 324, GainAllocation: 161.84 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2015, 5, 10), 1004.78, new Date(2022, 8, 1), 9056.43);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: {Year:2015,Month:5,Day:10},
            PurchaseAmount: 1004.78,
            DisposeDate: {Year:2022,Month:8,Day:1},
            DisposeAmount: 9056.43,
            Gain: 8051.65,
            YearlyGainAllocations: new Map<number,YearlyGainAllocation>()
        };
        let yearlyGainAllocations= [
                { Year: 2015, NumberOfDays: 236, GainAllocation: 719.50 },
                { Year: 2016, NumberOfDays: 366, GainAllocation: 1115.83 },
                { Year: 2017, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 1115.83 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2022, NumberOfDays: 213, GainAllocation: 649.38 }
            ];
        expect([...shareBlock.YearlyGainAllocations.values()]).to.deep.equal(yearlyGainAllocations);
        shareBlock.YearlyGainAllocations.clear();
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});
