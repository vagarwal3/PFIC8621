import { InterestCalculator } from "./InterestCalculator"
import { TaxRate } from "./TaxRate"
import { ShareBlock } from "./ShareBlock"

export class Utility
{
  static ConvertNumberTo2DecimalPlace(amount: number) 
  {
    return parseFloat(amount.toFixed(2));
  }
}