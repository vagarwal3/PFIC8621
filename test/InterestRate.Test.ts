import { assert } from "chai";
import {InterestCalculator} from "../src/InterestCalculator"
import { Utility } from "../src/Utility";
import { Date } from "../src/Date";

describe('InterestCalculator', () => {
    it('GetInterestRateOnADate is returning incorrect value', () => {
        
        
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2023,1,1)),7);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2022,4,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2021,7,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2020,10,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2019,1,1)),6);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2018,4,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2017,7,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2016,10,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2015,1,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2014,4,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2013,7,1)),3);
    })
 }); 


describe('CalculateInterest', () => {
    it('CalculateInterest is returning incorrect value', () => {
        
        
        //assert.equal(InterestCalculator.CalculateInterest(100,new Date(2023,1,1),new Date(2023,3,15)),1.21);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,2,15),new Date(2021,2,15)),0);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,2,15),new Date(2021,2,16)),8.22);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,1,1),new Date(2021,2,1)),255.11);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,2,15),new Date(2021,3,15)),230.39);
        //assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2012,4,15),new Date(2022,10,20)),48364.57);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2015,1,1),new Date(2015,12,31)),3036.86);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2016,1,1),new Date(2016,12,31)),3813.91);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2017,1,1),new Date(2017,12,31)),4069.44);
        //assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2018,1,1),new Date(2018,12,31)),4856.39);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2019,1,1),new Date(2019,12,31)),5631.91);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2020,1,1),new Date(2020,12,31)),4060.93);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2020,1,1),new Date(2020,4,30)),1652.74);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,1,1),new Date(2021,12,31)),3036.86);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2022,1,1),new Date(2022,12,31)),4603.91);
    })
});

