import { assert } from "chai";
import {InterestCalculator} from "../InterestCalculator"

describe('InterestCalculator', () => {
    it('daysInMonth is returning incorrect value', () => {
        let cal:InterestCalculator =  new InterestCalculator();
        
        assert.equal(cal.daysInMonth(2,2023),28);
        assert.equal(cal.daysInMonth(2,2024),29);
    })
});
describe('InterestCalculator', () => {
    it('daysInYear is returning incorrect value', () => {
        let cal:InterestCalculator =  new InterestCalculator();
        
        assert.equal(cal.daysInYear(2020),366);
        assert.equal(cal.daysInYear(2023),365);
        assert.equal(cal.daysInYear(2024),366);
    })
});
describe('InterestCalculator', () => {
    it('GetInterestRateOnADate is returning incorrect value', () => {
        let cal:InterestCalculator =  new InterestCalculator();
        
        assert.equal(cal.GetInterestRateOnADate(new Date(2023,0,1)),7);
        assert.equal(cal.GetInterestRateOnADate(new Date(2022,3,1)),4);
        assert.equal(cal.GetInterestRateOnADate(new Date(2021,6,1)),3);
        assert.equal(cal.GetInterestRateOnADate(new Date(2020,9,1)),3);
        assert.equal(cal.GetInterestRateOnADate(new Date(2019,0,1)),6);
        assert.equal(cal.GetInterestRateOnADate(new Date(2018,3,1)),4);
        assert.equal(cal.GetInterestRateOnADate(new Date(2017,6,1)),4);
        assert.equal(cal.GetInterestRateOnADate(new Date(2016,9,1)),4);
        assert.equal(cal.GetInterestRateOnADate(new Date(2015,0,1)),3);
        assert.equal(cal.GetInterestRateOnADate(new Date(2014,3,1)),3);
        assert.equal(cal.GetInterestRateOnADate(new Date(2013,6,1)),3);
    })
 }); 
 describe('ConvertNumberTo2DecimalPlace', () => {
     it('ConvertNumberTo2DecimalPlace is returning incorrect value', () => {
         let cal:InterestCalculator =  new InterestCalculator();
        
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.3449999),100.34);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.34534533),100.35);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.3),100.30);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100),100);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.34934533),100.35);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.35034533),100.35);
         assert.equal(cal.ConvertNumberTo2DecimalPlace(100.35134533),100.35);
     })
 }); 

describe('CalculateInterest', () => {
    it('CalculateInterest is returning incorrect value', () => {
        let cal:InterestCalculator =  new InterestCalculator();
        
        //assert.equal(cal.CalculateInterest(new Date(2023,0,1),new Date(2023,2,15),100),1.21);
        assert.equal(cal.CalculateInterest(new Date(2021,1,15),new Date(2021,1,15),100000),0);
        assert.equal(cal.CalculateInterest(new Date(2021,1,15),new Date(2021,1,16),100000),8.22);
        assert.equal(cal.CalculateInterest(new Date(2021,0,1),new Date(2021,1,1),100000),255.11);
        assert.equal(cal.CalculateInterest(new Date(2021,1,15),new Date(2021,2,15),100000),230.39);
        //assert.equal(cal.CalculateInterest(new Date(2012,3,15),new Date(2022,9,20),100000),48364.57);
        assert.equal(cal.CalculateInterest(new Date(2015,0,1),new Date(2015,11,31),100000),3036.86);
        assert.equal(cal.CalculateInterest(new Date(2016,0,1),new Date(2016,11,31),100000),3813.91);
        assert.equal(cal.CalculateInterest(new Date(2017,0,1),new Date(2017,11,31),100000),4069.44);
        //assert.equal(cal.CalculateInterest(new Date(2018,0,1),new Date(2018,11,31),100000),4856.39);
        assert.equal(cal.CalculateInterest(new Date(2019,0,1),new Date(2019,11,31),100000),5631.91);
        assert.equal(cal.CalculateInterest(new Date(2020,0,1),new Date(2020,11,31),100000),4060.93);
        assert.equal(cal.CalculateInterest(new Date(2020,0,1),new Date(2020,3,30),100000),1652.74);
        assert.equal(cal.CalculateInterest(new Date(2021,0,1),new Date(2021,11,31),100000),3036.86);
        assert.equal(cal.CalculateInterest(new Date(2022,0,1),new Date(2022,11,31),100000),4603.91);
    })
});

