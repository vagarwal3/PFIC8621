import React from "react";
import { ITransaction } from "./PFICCalculator";
import { Transactions } from "./Transaction";
import { Date } from "../lib/Date";

import { USPersonSinceSelector } from "./USPersonSinceSelector";
interface p {
    TaxYear: number | null;
    FundType: string | null;
    USPersonSince:string|null;
    Transactions: ITransaction[];

    onInputChange(fieldName: string, fieldValue: string | number | null): void;
    onTransactionChange(rowID: number, fieldName: string, fieldValue: string | number | Date | null): void;
}
export class PFICInput extends React.Component<p, any> {
    onTaxYearChange = (e: any) => {
        if (e.target.value === "")
            this.props.onInputChange('TaxYear', null);

        else
            this.props.onInputChange('TaxYear', parseInt(e.target.value));
    }
    onFundTypeChange = (e: any) => {
        if (e.target.value === "")
            this.props.onInputChange('FundType', null);

        else
            this.props.onInputChange('FundType', e.target.value);
    }
    onUSPersonSinceChange = (value:string) => {
         if (value === "")
            this.props.onInputChange('USPersonSince', null);

        else
            this.props.onInputChange('USPersonSince', value);
    }
    onTransactionChange = (rowID: number, fieldName: string, fieldValue: string | number | Date | null) => {
        this.props.onTransactionChange(rowID, fieldName, fieldValue);
    }
    public render(): JSX.Element {
        return (

            <div className="main">
                <table className="main">
                    <tr><td width={150}>Tax Year: </td><td><select value={this.props.TaxYear == null ? "" : this.props.TaxYear.toString()} onChange={this.onTaxYearChange}><option value={""}></option><option value={"2022"}>2022</option></select></td></tr>
                    <tr><td>Fund Type: </td><td><select value={this.props.FundType == null ? "" : this.props.FundType.toString()} onChange={this.onFundTypeChange}><option value={""}></option><option value={"Section1291"}>Section 1291</option></select></td></tr>
                    <tr><td>US Person Since: </td><td><USPersonSinceSelector value={this.props.USPersonSince==null?"":this.props.USPersonSince as string} onChange={this.onUSPersonSinceChange}></USPersonSinceSelector></td></tr>
                    
                    <tr><td>Transactions:</td></tr>
                    <tr><td colSpan={2}><Transactions Transactions={this.props.Transactions} onChange={this.onTransactionChange}></Transactions></td></tr>
                </table>
            </div>);
    }
}