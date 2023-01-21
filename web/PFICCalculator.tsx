import React from "react";
import { PFICInput } from "./PFICInput";
import { PFICOutput } from "./PFICOutput";

export interface ITransaction {
    TaxNumberID: string;
    FundName: string;
    Date: Date | null;
    Amount: number | null;
    Units: number | null;
}
interface IPFICCalculateorState {
    TaxYear: number | null;
    USPersonSince: number | null;
    FundType: string;
    Transactions: ITransaction[];
    ShowOutput: boolean;
}

export class PFICCalculator extends React.Component<any, IPFICCalculateorState>{
    constructor(props: any) {
        super(props);
        let transactions: ITransaction[] = [];
        for (let i = 0; i < 100; i++) {
            let transaction: ITransaction = { TaxNumberID: "", FundName: "", Date: null, Amount: null, Units: null };
            transactions.push(transaction);
        }
        this.state = {
            TaxYear: null,
            FundType: "",
            Transactions: transactions,
            USPersonSince: null,
            ShowOutput: false
        };
    }
    handleCalculate = () => {
        this.setState({ ShowOutput: true });
    }
    goBack = () => {
        this.setState({ ShowOutput: false });
    }
    handleInputChange = (rowID: number, fieldName: string, fieldValueString: string, fieldValueNumber: number) => {
        switch (fieldName) {
            case 'TaxYear':
                this.setState({ TaxYear: fieldValueNumber });
                break;
            case 'ReferenceIDNumber':
                this.setState(prevState => {
                    let newTransactions = [...prevState.Transactions]
                    newTransactions[rowID].TaxNumberID = fieldValueString
                    return { Transactions: newTransactions };
                })
        }
    }
    public render(): JSX.Element {
        return (
            <div>
                {!this.state.ShowOutput ?
                    <div>
                        <PFICInput TaxYear={this.state.TaxYear == null ? null : this.state.TaxYear.toString()} FundType={this.state.FundType} Transactions={this.state.Transactions}
                            onChange={this.handleInputChange}></PFICInput>
                        <input className="calculate" type={"button"} value={"Calculate"} onClick={this.handleCalculate}></input>
                        </div>
                        : <div><PFICOutput></PFICOutput>
                            <input className="calculate" type={"button"} value={"Back"} onClick={this.goBack}></input>

                        </div>
                }
                    </div>
        );
    }
}