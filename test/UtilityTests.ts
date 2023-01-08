import { assert } from "chai";
import { Utility } from "../Utility";

describe('Utility', () => {
    it('daysInMonth is returning incorrect value', () => {
        
        
        assert.equal(Utility.daysInMonth(2,2023),28);
        assert.equal(Utility.daysInMonth(2,2024),29);
    })
});
describe('Utility', () => {
    it('daysInYear is returning incorrect value', () => {
       
        
        assert.equal(Utility.daysInYear(2020),366);
        assert.equal(Utility.daysInYear(2023),365);
        assert.equal(Utility.daysInYear(2024),366);
    })
});