import React from "react";
import { Form8621Calculator, FundType, PFIC } from "../lib/Form8621Calculator";
import { USPersonStatus } from "../lib/USPersonStatus";
import { PFICInput } from "./PFICInput";
import { PFICOutput } from "./PFICOutput";
import { Date } from "../lib/Date";
import { Transaction, TransactionType } from "../lib/Transaction";

export interface ITransaction {
    ReferenceIDNumber: string | null;
    FundName: string | null;
    Type: string | null;
    Date: string | null;
    Amount: number | null;
    Units: number | null;
}
interface IPFICCalculateorState {
    TaxYear: number | null;
    USPersonSince: string | null;
    FundType: string | null;
    Transactions: ITransaction[];
    PFICs: PFIC[];
    ShowOutput: boolean;
}

export class PFICCalculator extends React.Component<any, IPFICCalculateorState>{
    constructor(props: any) {
        super(props);
        let transactions: ITransaction[] = [];
        for (let i = 0; i < 100; i++) {
            let transaction: ITransaction = { ReferenceIDNumber: null, FundName: null, Type: null, Date: null, Amount: null, Units: null };
            transactions.push(transaction);
        }
        this.state = {
            TaxYear: null,
            FundType: "",
            Transactions: transactions,
            USPersonSince: null,
            ShowOutput: false,
            PFICs: []
        };
    }
    handleCalculate = () => {
        if (this.state.TaxYear == null || this.state.FundType == null)
            return;
        let taxYear: number = this.state.TaxYear ?? 1;
        let fundType: FundType = this.state.FundType === "Section1291" ? FundType.Section1291 : FundType.Section1291;
        let usPersonStatus: USPersonStatus;
        if (this.state.USPersonSince == null) {
            return;
        }
        else if (this.state.USPersonSince as string === "Birth") {
            usPersonStatus = new USPersonStatus(true, null);
        }
        else {
            usPersonStatus = new USPersonStatus(false, parseInt(this.state.USPersonSince));
        }
        let transactions: Transaction[] = [];
        this.state.Transactions.forEach(t => {
            if (t.ReferenceIDNumber != null) {
                let transactionType: TransactionType;
                if (t.Type == null) {
                    return;
                }
                else if (t.Type === "Purchase") {
                    transactionType = TransactionType.Purchase;
                }
                else {
                    transactionType = TransactionType.Dispose;
                }
                if (t.Date == null)
                    return;
                let date: Date = Date.parse(t.Date as string);
                if (t.Units == null || t.Amount == null || t.FundName == null)
                    return;
                let transaction = new Transaction(t.ReferenceIDNumber as string, t.FundName as string, transactionType, date, t.Units as number, t.Amount as number);
                transactions.push(transaction);
            }
        });


        let arrPFICs: PFIC[] = Form8621Calculator.Compute(taxYear, fundType, usPersonStatus, transactions)
        if (arrPFICs.length > 0)
            this.setState({ PFICs: arrPFICs, ShowOutput: true });
    }
    goBack = () => {
        this.setState({ ShowOutput: false });
    }
    handleInputChange = (fieldName: string, fieldValue: string | number | null) => {
        switch (fieldName) {
            case 'TaxYear':
                this.setState({ TaxYear: fieldValue as number | null });
                break;
            case 'FundType':
                this.setState({ FundType: fieldValue as string | null });
                break;
            case 'USPersonSince':
                this.setState({ USPersonSince: fieldValue as string | null });
                break;
        }
    }
    handleTransactionChange = (rowID: number, fieldName: string, fieldValue: string | number | Date | null) => {

        this.setState(prevState => {
            let newTransactions = [...prevState.Transactions];

            switch (fieldName) {
                case 'ReferenceIDNumber':
                    newTransactions[rowID].ReferenceIDNumber = fieldValue as string | null;
                    if (fieldValue != null && newTransactions[rowID].FundName == null) {
                        let transactionWithFundName = newTransactions.find(a => a.ReferenceIDNumber === fieldValue && a.FundName != null);
                        if (transactionWithFundName != null) {
                            newTransactions[rowID].FundName = transactionWithFundName.FundName;
                        }
                    }
                    break;
                case 'FundName':
                    newTransactions[rowID].FundName = fieldValue as string | null;
                    break;
                case 'Type':
                    newTransactions[rowID].Type = fieldValue as string | null;
                    break;
                case 'Date':
                    newTransactions[rowID].Date = fieldValue as string | null;
                    break;
                case 'Units':
                    newTransactions[rowID].Units = fieldValue as number | null;
                    break;
                case 'Amount':
                    newTransactions[rowID].Amount = fieldValue as number | null;
                    break;
            }
            return { Transactions: newTransactions };

        })
    }
    public render(): JSX.Element {
        return (
            <div>
                {!this.state.ShowOutput ?
                    <div>
                     <h1 className="mt-4">Form 8621 - Section 1291</h1>
                     <p>Use this tool to calculate values for Form 8621 for your 1291 funds.</p>
                        <PFICInput TaxYear={this.state.TaxYear} USPersonSince={this.state.USPersonSince} FundType={this.state.FundType} Transactions={this.state.Transactions}
                            onInputChange={this.handleInputChange} onTransactionChange={this.handleTransactionChange}></PFICInput>
                        <input className="calculate" type={"button"} value={"Calculate"} onClick={this.handleCalculate}></input>
                    </div>
                    : <div><PFICOutput PFICs={this.state.PFICs}></PFICOutput>
                        <input className="calculate" type={"button"} value={"Back"} onClick={this.goBack}></input>
                    </div>
                }
                <br></br><br></br>
            </div>
        );
    }
}