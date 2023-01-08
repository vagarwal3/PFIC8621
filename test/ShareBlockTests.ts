import { assert, expect } from "chai";
import { ShareBlock } from "../ShareBlock"

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 100, new Date(2022, 0, 1), 100);

        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 0
        };

        // assert.equal(shareBlock.YearlyGainAllocations.size, 1);
        // assert.equal(shareBlock.Line16B, 0);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 1);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 0);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 100, new Date(2022, 0, 1), 101);

        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1
        };

        // assert.equal(shareBlock.ShareBlockYearDetails.length, 1);
        // assert.equal(shareBlock.Line16B, 1);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 1);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 1);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 78.9, new Date(2022, 0, 1), 200.78);

        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 121.88
        };

        // assert.equal(shareBlock.ShareBlockYearDetails.length, 1);
        // assert.equal(shareBlock.Line16B, 121.88);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 1);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 121.88);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 0, 1), 1000, new Date(2022, 0, 2), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1000
        };

        // assert.equal(shareBlock.ShareBlockYearDetails.length, 1);
        // assert.equal(shareBlock.Line16B, 1000);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 2);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 1000);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2022, 2, 14), 1000, new Date(2022, 6, 23), 2000);

        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1000
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 1);
        // assert.equal(shareBlock.Line16B, 1000);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 132);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 1000);
        expect(shareBlock).to.deep.equal(expectedResult);

    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2021, 2, 14), 1000, new Date(2022, 6, 12), 2000);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1000
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 2);
        // assert.equal(shareBlock.Line16B, 397.12);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 293);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 602.88);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 193);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 397.12);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct1', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain:  1042.80
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 3);
        // assert.equal(shareBlock.Line16B, 267.15);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 304.58);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 471.07);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 207);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 267.15);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2019, 11, 10), 1024.21, new Date(2022, 10, 30), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1032.69
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 4);
        // assert.equal(shareBlock.Line16B, 317.31);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2019);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 22);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 20.90);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 347.71);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 346.76);

        // assert.equal(shareBlock.ShareBlockYearDetails[3].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].NumberOfDays, 334);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].ProfitAlocation, 317.31);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2018, 7, 14), 1034, new Date(2022, 11, 1), 3056.80);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 2022.80
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 5);
        // assert.equal(shareBlock.Line16B, 431.34);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2018);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 140);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 180.26);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2019);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 469.97);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 471.26);

        // assert.equal(shareBlock.ShareBlockYearDetails[3].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].ProfitAlocation, 469.97);

        // assert.equal(shareBlock.ShareBlockYearDetails[4].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].NumberOfDays, 335);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].ProfitAlocation, 431.34);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2017, 5, 11), 1704.78, new Date(2022, 4, 12), 4456.89);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 2752.11
        };
       
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 6);
        // assert.equal(shareBlock.Line16B, 202.16);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2017);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 204);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 312.43);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2018);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 559.00);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2019);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 559.00);

        // assert.equal(shareBlock.ShareBlockYearDetails[3].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].ProfitAlocation, 560.53);

        // assert.equal(shareBlock.ShareBlockYearDetails[4].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].ProfitAlocation, 559.00);

        // assert.equal(shareBlock.ShareBlockYearDetails[5].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].NumberOfDays, 132);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].ProfitAlocation, 202.16);
        expect(shareBlock).to.deep.equal(expectedResult);

    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2016, 4, 10), 1014.71, new Date(2022, 10, 20), 2206.50);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1191.79
        };
       
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 7);
        // assert.equal(shareBlock.Line16B, 161.84);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2016);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 117.88);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2017);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 182.31);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2018);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 182.31);

        // assert.equal(shareBlock.ShareBlockYearDetails[3].Year, 2019);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].ProfitAlocation, 182.31);

        // assert.equal(shareBlock.ShareBlockYearDetails[4].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].ProfitAlocation, 182.81);

        // assert.equal(shareBlock.ShareBlockYearDetails[5].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].ProfitAlocation, 182.31);

        // assert.equal(shareBlock.ShareBlockYearDetails[6].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].NumberOfDays, 324);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].ProfitAlocation, 161.84);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2015, 4, 10), 1004.78, new Date(2022, 7, 1), 9056.43);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 8051.65
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 8);
        // assert.equal(shareBlock.Line16B, 649.38);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2015);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 719.50);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2016);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 1115.83);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2017);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 1112.78);

        // assert.equal(shareBlock.ShareBlockYearDetails[3].Year, 2018);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[3].ProfitAlocation, 1112.78);

        // assert.equal(shareBlock.ShareBlockYearDetails[4].Year, 2019);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[4].ProfitAlocation, 1112.78);

        // assert.equal(shareBlock.ShareBlockYearDetails[5].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].NumberOfDays, 366);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[5].ProfitAlocation, 1115.83);

        // assert.equal(shareBlock.ShareBlockYearDetails[6].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[6].ProfitAlocation, 1112.78);

        // assert.equal(shareBlock.ShareBlockYearDetails[7].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[7].NumberOfDays, 213);
        // assert.equal(shareBlock.ShareBlockYearDetails[7].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[7].ProfitAlocation, 649.38);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1042.80
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 3);
        // assert.equal(shareBlock.Line16B, 1042.80);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 304.58);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 471.07);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 207);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 267.15);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1042.80
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 3);
        // assert.equal(shareBlock.Line16B, 571.73);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 304.58);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 471.07);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 207);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 267.15);

        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1042.80
        };
        
        // assert.equal(shareBlock.ShareBlockYearDetails.length, 3);
        // assert.equal(shareBlock.Line16B, 267.15);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 304.58);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 471.07);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 207);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 267.15);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock: ShareBlock = new ShareBlock(2022, 1, new Date(2020, 4, 10), 1014.10, new Date(2022, 6, 26), 2056.90);
        let expectedResult = {
            NumberOfUnits: 1,
            Gain: 1042.80
        };

        // assert.equal(shareBlock.ShareBlockYearDetails.length, 3);
        // assert.equal(shareBlock.Line16B, 267.15);

        // assert.equal(shareBlock.ShareBlockYearDetails[0].Year, 2020);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays, 236);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation, 304.58);

        // assert.equal(shareBlock.ShareBlockYearDetails[1].Year, 2021);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays, 365);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].IsCurrentTaxYear, false);
        // assert.equal(shareBlock.ShareBlockYearDetails[1].ProfitAlocation, 471.07);

        // assert.equal(shareBlock.ShareBlockYearDetails[2].Year, 2022);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].NumberOfDays, 207);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].IsCurrentTaxYear, true);
        // assert.equal(shareBlock.ShareBlockYearDetails[2].ProfitAlocation, 267.15);
        expect(shareBlock).to.deep.equal(expectedResult);
    })
});
