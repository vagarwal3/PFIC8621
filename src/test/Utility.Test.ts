import { assert } from "chai";
import { Utility } from "../lib/Utility";

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

 describe('FormatCurrency', () => {
     it('FormatCurrency is returning incorrect value', () => {        
         assert.equal(Utility.FormatCurrency(-100.3449999,false),"(100.34)");
         assert.equal(Utility.FormatCurrency(-100,false),"(100)");
         assert.equal(Utility.FormatCurrency(0,false),"0");
         assert.equal(Utility.FormatCurrency(100.34534533,false),"100.35");
         assert.equal(Utility.FormatCurrency(100.3,false),"100.3");
         assert.equal(Utility.FormatCurrency(100,false),"100");
         assert.equal(Utility.FormatCurrency(100.34934533,false),"100.35");
         assert.equal(Utility.FormatCurrency(100.35034533,false),"100.35");
         assert.equal(Utility.FormatCurrency(100.35134533,false),"100.35");
     })
 }); 
