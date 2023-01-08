import { assert, expect } from "chai";
import { ShareBlock } from "../ShareBlock"

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 100, new Date(2022, 0, 1), 100);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2022, 0, 1),
            PurchaseAmount: 100,
            DisposeDate: new Date(2022, 0, 1),
            DisposeAmount: 100,
            Gain: 0,
            YearlyGainAllocations: [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 0 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 100, new Date(2022, 0, 1), 101);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2022, 0, 1),
            PurchaseAmount: 100,
            DisposeDate: new Date(2022, 0, 1),
            DisposeAmount: 101,
            Gain: 1,
            YearlyGainAllocations: [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 1 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 78.9, new Date(2022, 0, 1), 200.78);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2022, 0, 1),
            PurchaseAmount: 78.9,
            DisposeDate: new Date(2022, 0, 1),
            DisposeAmount: 200.78,
            Gain: 121.88,
            YearlyGainAllocations: [
                { Year: 2022, NumberOfDays: 1, GainAllocation: 121.88 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 1000, new Date(2022, 0, 2), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2022, 0, 1),
            PurchaseAmount: 1000,
            DisposeDate: new Date(2022, 0, 2),
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: [
                { Year: 2022, NumberOfDays: 2, GainAllocation: 1000 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 2, 14), 1000, new Date(2022, 6, 23), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2022, 2, 14),
            PurchaseAmount: 1000,
            DisposeDate: new Date(2022, 6, 23),
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: [
                { Year: 2022, NumberOfDays: 132, GainAllocation: 1000 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);

    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2021, 2, 14), 1000, new Date(2022, 6, 12), 2000);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2021, 2, 14),
            PurchaseAmount: 1000,
            DisposeDate: new Date(2022, 6, 12),
            DisposeAmount: 2000,
            Gain: 1000,
            YearlyGainAllocations: [
                { Year: 2021, NumberOfDays: 293, GainAllocation: 602.88 },
                { Year: 2022, NumberOfDays: 193, GainAllocation: 397.12 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct1', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2020, 4, 10),
            PurchaseAmount: 1014.10,
            DisposeDate: new Date(2022, 6, 26),
            DisposeAmount: 2056.90,
            Gain: 1042.8,
            YearlyGainAllocations: [
                { Year: 2020, NumberOfDays: 236, GainAllocation: 304.58 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 471.07 },
                { Year: 2022, NumberOfDays: 207, GainAllocation: 267.15 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2019, 11, 10), 1024.21, new Date(2022, 10, 30), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2019, 11, 10),
            PurchaseAmount: 1024.21,
            DisposeDate: new Date(2022, 10, 30),
            DisposeAmount: 2056.90,
            Gain: 1032.69,
            YearlyGainAllocations: [
                { Year: 2019, NumberOfDays: 22, GainAllocation: 20.90 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 347.71 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 346.76 },
                { Year: 2022, NumberOfDays: 334, GainAllocation: 317.31 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 78, new Date(2018, 7, 14), 1034, new Date(2022, 11, 1), 3056.80);
        let expectedResult = {
            NumberOfUnits: 78,
            PurchaseDate: new Date(2018, 7, 14),
            PurchaseAmount: 1034,
            DisposeDate: new Date(2022, 11, 1),
            DisposeAmount: 3056.80,
            Gain: 2022.80,
            YearlyGainAllocations: [
                { Year: 2018, NumberOfDays: 140, GainAllocation: 180.26225334182 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 469.969446212603 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 471.257033736474 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 469.969446212603 },
                { Year: 2022, NumberOfDays: 335, GainAllocation: 431.341820496499 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2017, 5, 11), 1704.78, new Date(2022, 4, 12), 4456.89);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2017, 5, 11),
            PurchaseAmount: 1704.78,
            DisposeDate: new Date(2022, 4, 12),
            DisposeAmount: 4456.89,
            Gain: 2752.11,
            YearlyGainAllocations: [
                { Year: 2017, NumberOfDays: 204, GainAllocation: 312.43 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 560.53 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 559.0 },
                { Year: 2022, NumberOfDays: 132, GainAllocation: 202.16 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);

    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2016, 4, 10), 1014.71, new Date(2022, 10, 20), 2206.50);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2016, 4, 10),
            PurchaseAmount: 1014.10,
            DisposeDate: new Date(2022, 10, 20),
            DisposeAmount: 2206.50,
            Gain: 1191.79,
            YearlyGainAllocations: [
                { Year: 2017, NumberOfDays: 365, GainAllocation: 182.314899413244 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 182.314899413244 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 182.314899413244 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 182.814392288349 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 182.314899413244 },
                { Year: 2022, NumberOfDays: 324, GainAllocation: 161.835691533948 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2015, 4, 10), 1004.78, new Date(2022, 7, 1), 9056.43);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2015, 4, 10),
            PurchaseAmount: 1004.78,
            DisposeDate: new Date(2022, 7, 1),
            DisposeAmount: 9056.43,
            Gain: 8051.65,
            YearlyGainAllocations: [
                { Year: 2015, NumberOfDays: 236, GainAllocation: 719.50 },
                { Year: 2016, NumberOfDays: 366, GainAllocation: 719.50 },
                { Year: 2017, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2018, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2019, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2020, NumberOfDays: 366, GainAllocation: 1115.83 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 1112.78 },
                { Year: 2022, NumberOfDays: 213, GainAllocation: 649.38 }
            ]
        };

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            PurchaseDate: new Date(2020, 4, 10),
            PurchaseAmount: 1014.10,
            DisposeDate: new Date(2022, 6, 26),
            DisposeAmount: 2056.90,
            Gain: 1042.8,
            YearlyGainAllocations: [
                { Year: 2020, NumberOfDays: 236, GainAllocation: 304.58 },
                { Year: 2021, NumberOfDays: 365, GainAllocation: 471.07 },
                { Year: 2022, NumberOfDays: 207, GainAllocation: 267.15 }
            ]
        };
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});
