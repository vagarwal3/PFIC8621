import { assert } from "chai";
import {InterestCalculator} from "../InterestCalculator"
import { Utility } from "../Utility";


describe('InterestCalculator', () => {
    it('GetInterestRateOnADate is returning incorrect value', () => {
        
        
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2023,0,1)),7);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2022,3,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2021,6,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2020,9,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2019,0,1)),6);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2018,3,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2017,6,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2016,9,1)),4);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2015,0,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2014,3,1)),3);
        assert.equal(InterestCalculator.GetInterestRateOnADate(new Date(2013,6,1)),3);
    })
 }); 
 describe('ConvertNumberTo2DecimalPlace', () => {
     it('ConvertNumberTo2DecimalPlace is returning incorrect value', () => {        
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.3449999),100.34);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.34534533),100.35);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.3),100.30);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100),100);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.34934533),100.35);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.35034533),100.35);
         assert.equal(Utility.ConvertNumberTo2DecimalPlace(100.35134533),100.35);
     })
 }); 

describe('CalculateInterest', () => {
    it('CalculateInterest is returning incorrect value', () => {
        
        
        //assert.equal(InterestCalculator.CalculateInterest(100,new Date(2023,0,1),new Date(2023,2,15)),1.21);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,1,15),new Date(2021,1,15)),0);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,1,15),new Date(2021,1,16)),8.22);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,0,1),new Date(2021,1,1)),255.11);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,1,15),new Date(2021,2,15)),230.39);
        //assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2012,3,15),new Date(2022,9,20)),48364.57);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2015,0,1),new Date(2015,11,31)),3036.86);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2016,0,1),new Date(2016,11,31)),3813.91);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2017,0,1),new Date(2017,11,31)),4069.44);
        //assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2018,0,1),new Date(2018,11,31)),4856.39);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2019,0,1),new Date(2019,11,31)),5631.91);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2020,0,1),new Date(2020,11,31)),4060.93);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2020,0,1),new Date(2020,3,30)),1652.74);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2021,0,1),new Date(2021,11,31)),3036.86);
        assert.equal(InterestCalculator.CalculateInterest(100000,new Date(2022,0,1),new Date(2022,11,31)),4603.91);
    })
});

