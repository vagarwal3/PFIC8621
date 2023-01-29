import React from "react";


export class Transactions extends React.Component<any,any> {
    onReferenceIDNumberChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'ReferenceIDNumber', value==""?null:value);
    }
   onFundNameChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'FundName',  value==""?null:value);
    }
   onTypeChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'Type',  value==""?null:value);
    }
   onDateChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'Date',  value==""?null:value);
    }
   onUnitsChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'Units',  value==""?null:parseInt(value));
    }
   onAmountChange=(rowID:number,value:string)=>
    {
        this.props.onChange(rowID,'Amount', value==""?null:parseInt(value));
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
                        <tr key={rowID}  className="DataRow">
                            <td className="ColumnCell">{rowID+1}</td>
                            <td><input className="referenceIDNumber" value={a.ReferenceIDNumber==null?"":a.ReferenceIDNumber as string} onChange={(e)=>this.onReferenceIDNumberChange(rowID,e.target.value)}/></td>
                            <td><input value={a.FundName==null?"":a.FundName as string} onChange={(e)=>this.onFundNameChange(rowID,e.target.value)}/></td>
                            <td><select value={a.Type==null?"":a.Type} onChange={(e)=>this.onTypeChange(rowID,e.target.value)}><option key="" value=""></option>
                            <option key="Purchase" value="Purchase">Purchase</option>
                            <option key="Sale" value="Sale">Sale</option>
                            </select></td>
                            <td><input type={"date"} value={a.Date==null?"":a.Date.toString()} min={"1990-01-01"} max={"2022-12-31"} onChange={(e)=>this.onDateChange(rowID,e.target.value)}></input></td>
                            <td><input type={"number"} value={a.Units==null?"":a.Units} min={0} max={9999999} onChange={(e)=>this.onUnitsChange(rowID,e.target.value)}></input></td>
                            <td><input type={"number"} value={a.Amount==null?"":a.Amount} min={0} max={9999999} onChange={(e)=>this.onAmountChange(rowID,e.target.value)}></input></td>
                            </tr>
                        )

                    }
                </table>
            
        </div>);
    }
}