import { assert } from "chai";
import {ShareBlock} from "../ShareBlock"

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock:ShareBlock =  new ShareBlock(2022,1,new Date(2022,0,1),1,new Date(2022,0,1),1);
        
        assert.equal(shareBlock.NumberOfUnits,1);
        assert.equal(shareBlock.ShareBlockYearDetails.length,1);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,1);
    })
});


describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock:ShareBlock =  new ShareBlock(2022,1,null,1,new Date(2022,0,1),1,new Date(2022,1,1),1);
        
        assert.equal(shareBlock.NumberOfUnits,1);
        assert.equal(shareBlock.ShareBlockYearDetails.length,1);
        assert.equal(shareBlock.Line16B,0);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].Year,2022);
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,31);
        assert.equal(shareBlock.ShareBlockYearDetails[0].IsCurrentTaxYear,true);
        assert.equal(shareBlock.ShareBlockYearDetails[0].ProfitAlocation,0);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock:ShareBlock =  new ShareBlock(2022,1,new Date(2021,0,1),1000,new Date(2022,1,1),2000);
        
        assert.equal(shareBlock.NumberOfUnits,1);
        assert.equal(shareBlock.ShareBlockYearDetails.length,2);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].Year,2021);
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,364);
        assert.equal(shareBlock.ShareBlockYearDetails[0].Line16c,999);

        assert.equal(shareBlock.ShareBlockYearDetails[1].Year,2022);
        assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays,1);
        assert.equal(shareBlock.ShareBlockYearDetails[1].Line16c,1);
    })
});

describe('ShareBlock', () => {
    it('ShareBlock initialization is correct', () => {
        let shareBlock:ShareBlock =  new ShareBlock(2022,1,new Date(2017,5,11),1000.56,new Date(2022,3,24),2000.18);
        
        assert.equal(shareBlock.NumberOfUnits,1);
        assert.equal(shareBlock.ShareBlockYearDetails.length,6);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].Year,2017);
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,200);
        assert.equal(shareBlock.ShareBlockYearDetails[0].Line16c,999);

        assert.equal(shareBlock.ShareBlockYearDetails[1].Year,2018);
        assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays,365);
        assert.equal(shareBlock.ShareBlockYearDetails[1].Line16c,1);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].Year,2019);
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,365);
        assert.equal(shareBlock.ShareBlockYearDetails[0].Line16c,999);

        assert.equal(shareBlock.ShareBlockYearDetails[1].Year,2020);
        assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays,366);
        assert.equal(shareBlock.ShareBlockYearDetails[1].Line16c,1);
        
        assert.equal(shareBlock.ShareBlockYearDetails[0].Year,2021);
        assert.equal(shareBlock.ShareBlockYearDetails[0].NumberOfDays,365);
        assert.equal(shareBlock.ShareBlockYearDetails[0].Line16c,999);

        assert.equal(shareBlock.ShareBlockYearDetails[1].Year,2022);
        assert.equal(shareBlock.ShareBlockYearDetails[1].NumberOfDays,1);
        assert.equal(shareBlock.ShareBlockYearDetails[1].Line16c,1);
    })
});