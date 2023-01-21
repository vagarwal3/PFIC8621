import React from "react";


export class Transactions extends React.Component<any,any> {
    onReferenceIDNumberChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'ReferenceIDNumber', value,'');
    }

    public render(): JSX.Element {
        let transactions:any = this.props.Transactions;
        return (
        <div className="Transaction">
            <table className={"Transaction"}>
                <tr className="HeaderRow">
                    <td>&#x25E2;</td>
                    <td>Reference ID Number</td>
                    <td>Fund Name</td>
                    <td>Type</td>
                    <td>Date</td>
                    <td>Units</td>
                    <td>Amount</td>
                    </tr>
                    {
                        transactions.map((a:any,rowID:number)=>
                        <tr className="DataRow">
                            <td className="ColumnCell">{rowID}</td>
                            <td><input className="referenceIDNumber" value={a.TaxNumberID} onChange={(e)=>this.onReferenceIDNumberChange(rowID,e.target.value)}/></td>
                            <td><input value={a.FundName}/></td>
                            <td><select><option value={""}>{""}</option>
                            <option value={"Purchase"}>{"Purchase"}</option>
                            <option value={"Sale"}>{"Sale"}</option>
                            </select></td>
                            <td><input type={"date"} min={"1/1/1900"} max={"12/31/2022"}></input></td>
                            <td><input type={"number"} min={0} max={9999999}></input></td>
                            <td><input type={"number"} min={0} max={9999999}></input></td>
                            </tr>
                        )

                    }
                </table>
            
        </div>);
    }
}