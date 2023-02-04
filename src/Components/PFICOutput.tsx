
import React from "react";
import { PFIC, ShareHoldingYear } from "../lib/Form8621Calculator";
import { ShareBlock } from "../lib/ShareBlock";
import { Utility } from "../lib/Utility";

interface ICalOutput {
    PFICs: PFIC[];
}

export class PFICOutput extends React.Component<ICalOutput, any> {
    public render(): JSX.Element {
        return <div className="outputContainer">
            {
                this.props.PFICs.map((pfic: PFIC, index: number) =>                    
                    <div>
                    <table className="outputShareBlock">
                        <tr><td width={170}>Reference ID Number:</td>
                            <td>{pfic.ReferenceIDNumber}</td>
                        </tr>
                        <tr><td>Fund Name:</td>
                            <td>{pfic.FundName}</td>
                        </tr>
                        <tr><td colSpan={2}>
                            <table className="ShareBlocks">
                                <tr className="firstHeaerRow">
                                    <td className="columnLastCell" rowSpan={2}>#</td>
                                    <td className="columnLastCell" rowSpan={2}>Units</td>
                                    <td className="columnLastCell" colSpan={2}>Purchase</td>
                                    <td className="columnLastCell" colSpan={2}>Sale</td>
                                    <td className="columnLastCell" rowSpan={2}>Gain</td>
                                    <td className="columnLastCell" colSpan={pfic.ShareHoldingYears.size}>Share Holding Days</td>
                                    <td className="bottomBorder columnLastCell" rowSpan={2}>Line 16B</td>
                                    <td colSpan={pfic.ShareHoldingYears.size - 1}>Line 16C</td>
                                </tr>
                                <tr className="secondHeaerRow">
                                    <td className="leftAlignCell">Date</td>
                                    <td className="columnLastCell rightAlignCell">Amount</td>
                                    <td className="leftAlignCell">Date</td>
                                    <td className="columnLastCell rightAlignCell">Amount</td>
                                    {
                                        Array.from(pfic.ShareHoldingYears.keys()).map((year: number, index: number) =>
                                            <td className={pfic.ShareHoldingYears.size - 1 === index ? "columnLastCell rightAlignCell" : "rightAlignCell"}>{year}</td>
                                        )
                                    }
                                    {
                                        Array.from(pfic.ShareHoldingYears.values()).filter(a => !a.IsCurrentOrPrePFICYear()).map((shareHoldingYear: ShareHoldingYear, index: number) =>
                                            <td className="rightAlignCell">{shareHoldingYear.Year}</td>
                                        )
                                    }
                                </tr>
                                {
                                    pfic.ShareBlocks.map((shareBlock: ShareBlock, index: number) =>
                                        <tr>
                                            <td className="columnLastCell">{index + 1}</td>
                                            <td className="columnLastCell">{shareBlock.NumberOfUnits}</td>
                                            <td className="">{shareBlock.PurchaseDate.toString()}</td>
                                            <td className="rightAlignCell columnLastCell">{shareBlock.PurchaseAmount}</td>
                                            <td>{shareBlock.DisposeDate.toString()}</td>
                                            <td className="rightAlignCell columnLastCell">{shareBlock.DisposeAmount}</td>
                                            <td className="columnLastCell">{shareBlock.Gain}</td>
                                            {
                                                Array.from(pfic.ShareHoldingYears.keys()).map((year: number, index: number) =>
                                                    <td className={pfic.ShareHoldingYears.size - 1 === index ? "columnLastCell rightAlignCell" : "rightAlignCell"}>{shareBlock.YearlyGainAllocations.get(year)?.NumberOfDays}</td>
                                                )
                                            }
                                            <td className="columnLastCell">{
                                            this.GetLine16BForShareBlock(pfic,shareBlock)}</td>

                                            {
                                                Array.from(pfic.ShareHoldingYears.values()).filter(a => !a.IsCurrentOrPrePFICYear()).map((shareHoldingYear: ShareHoldingYear, index: number) =>

                                                    <td className="rightAlignCell">{shareBlock.YearlyGainAllocations.get(shareHoldingYear.Year)?.GainAllocation}</td>

                                                )
                                            }

                                        </tr>
                                    )

                                }
                                {
                                    
                                    [...Array(10-pfic.ShareBlocks.length)].map((x, i) =>
                                                                               <tr>
                                            <td className="columnLastCell"></td>
                                            <td className="columnLastCell"></td>
                                            <td></td>
                                            <td className="columnLastCell"></td>
                                            <td></td>
                                            <td className="columnLastCell"></td>
                                            <td className="columnLastCell"></td>
                                            {
                                                Array.from(pfic.ShareHoldingYears.keys()).map((year: number, index: number) =>
                                                    <td className={pfic.ShareHoldingYears.size - 1 === index ? "columnLastCell rightAlignCell" : "rightAlignCell"}></td>
                                                )
                                            }
                                            <td className="columnLastCell">&nbsp;</td>

                                            {
                                                Array.from(pfic.ShareHoldingYears.values()).filter(a => !a.IsCurrentOrPrePFICYear()).map((shareHoldingYear: ShareHoldingYear, index: number) =>

                                                    <td className="rightAlignCell"></td>

                                                )
                                            }

                                        </tr>

                                    )
                                    }
                                <tr className="totalRow"><td>Total</td><td className="columnLastCell"></td>
                                    <td ></td>
                                    <td className="rightAlignCell columnLastCell">{pfic.TotalPurchaseAmount}</td>
                                    <td></td>
                                    <td className="rightAlignCell columnLastCell">{pfic.TotalDisposeAmount}</td>
                                    <td className="rightAlignCell columnLastCell">{pfic.TotalGain}</td>
                                    <td className="columnLastCell" colSpan={pfic.ShareHoldingYears.size}></td>
                                    <td className="rightAlignCell columnLastCell">{pfic.TotalOtherIncome}</td>
                                    {
                                        Array.from(pfic.ShareHoldingYears.values()).filter(a => !a.IsCurrentOrPrePFICYear()).map((shareHoldingYear: ShareHoldingYear, index: number) =>

                                            <td className="rightAlignCell rightAlignCell">{shareHoldingYear.TotalGain}</td>
                                        )
                                    }
                                </tr>
                            </table>
                        </td>
                        </tr><tr><td className="summaryTitle" colSpan={2}>Summary</td></tr>
                        <tr><td colSpan={2}>
                            <table className="summary">
                                <tr><td>Line 15f</td><td>Line 16b</td><td>Line 16c</td><td>Line 16d</td><td>Line 16e</td>
                                    <td>Line 16f</td></tr>
                                <tr><td>{pfic.Form8621.Line15f}</td><td>{pfic.Form8621.Line16b}</td>
                                    <td>{pfic.Form8621.Line16c}</td><td>{pfic.Form8621.Line16d}</td><td>{pfic.Form8621.Line16e}</td>
                                    <td>{pfic.Form8621.Line16f}</td></tr>
                            </table>
                        </td></tr>
                        <tr><td>&nbsp;</td></tr>
                    </table>
                    <hr></hr>
                    </div>
                )}
        </div>
    }
    GetLine16BForShareBlock(pfic: PFIC, shareBlock: ShareBlock): React.ReactNode {
        let Line16BForShareBlock:number=0;
        for(let yearlyGainAllocation of shareBlock.YearlyGainAllocations.values())
        {
            let year:number = yearlyGainAllocation.Year;
            if(pfic.ShareHoldingYears.get(year)?.IsCurrentOrPrePFICYear())
            {
                Line16BForShareBlock=Utility.ConvertNumberTo2DecimalPlace(Line16BForShareBlock+yearlyGainAllocation.GainAllocation);
            }
        }
        return Line16BForShareBlock;
    }
}
