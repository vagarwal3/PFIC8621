import React from "react";
import { ITransaction } from "./PFICCalculator";
import { Transactions } from "./Transaction";

import { USPersonSinceSelector } from "./USPersonSinceSelector";
 interface p
{
    TaxYear:string|null;
    FundType:string;
    Transactions:ITransaction[];

    onChange(rowID:number, fieldName:string, fieldValueString: string, fieldValueNumber: number):void;
}
export class PFICInput extends React.Component<p,any> {
    onTaxYearChange=(e:any)=>
    {
        this.props.onChange(0,'TaxYear','',parseFloat( e.target.value));
    }
    onUSPersonSinceChange=(e:any)=>
    {
        this.props.onChange(0,'USPersonSince','',parseFloat( e.target.value));
    }
    onInputChange=(rowID: number, fieldName: string, fieldValueString: string, fieldValueNumber: number)=>
    {
        this.props.onChange(rowID,fieldName,fieldValueString,fieldValueNumber);
    }
    public render(): JSX.Element {
        const taxYear = 2022;//this.state.TaxYear;
        return (
            
        <div className="main">
            <table className="main">
                <tr><td width={150}>Tax Year: </td><td><select value={this.props.TaxYear==null?"":this.props.TaxYear.toString()} onChange={this.onTaxYearChange}><option value={""}></option><option value={"2022"}>2022</option></select></td></tr>
                <tr><td>US Person Since: </td><td><USPersonSinceSelector onChange={this.onUSPersonSinceChange}></USPersonSinceSelector></td></tr>
                <tr><td>&nbsp;</td></tr>
                <tr><td>Transactions</td></tr>
                <tr><td colSpan={2}><Transactions Transactions={this.props.Transactions}  onChange={this.onInputChange}></Transactions></td></tr>
            </table>
            
            
            
        </div>);
    }
}