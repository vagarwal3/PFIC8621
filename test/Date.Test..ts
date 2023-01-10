import { assert } from "chai";
import { Date } from "../src/Date";

describe('Date', () => {
    it('DateDifInDays is returning incorrect value', () => {
        assert.equal(Date.DateDifInDays(new Date(2022,1,1),new Date(2022,1,1),true),1);
        assert.equal(Date.DateDifInDays(new Date(2022,1,1),new Date(2022,1,1),false),0);
        assert.equal(Date.DateDifInDays(new Date(2022,1,1),new Date(2022,2,5),true),36);
        assert.equal(Date.DateDifInDays(new Date(2022,1,1),new Date(2022,2,5),false),35);
        assert.equal(Date.DateDifInDays(new Date(1980,2,1),new Date(2040,8,5),true),22102);
    })
});
describe('Date', () => {
    it('GetNumberOfDaysInMonth is returning incorrect value', () => {
        
        
        assert.equal(Date.GetNumberOfDaysInMonth(2020,2),29);
        assert.equal(Date.GetNumberOfDaysInMonth(2023,2),28);
        assert.equal(Date.GetNumberOfDaysInMonth(2024,2),29);

        assert.equal(Date.GetNumberOfDaysInMonth(2020,1),31);
        assert.equal(Date.GetNumberOfDaysInMonth(2020,4),30);
    })
});
describe('Date', () => {
    it('GetNumberOfDaysInYear is returning incorrect value', () => {
       
        
        assert.equal(Date.GetNumberOfDaysInYear(2020),366);
        assert.equal(Date.GetNumberOfDaysInYear(2023),365);
        assert.equal(Date.GetNumberOfDaysInYear(2000),366);
    })
});