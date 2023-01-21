
import React from "react";




export class PFICOutput extends React.Component<any, any> {
    public render(): JSX.Element {
        return <div>
            <table className="outputShareBlock">
                <tr><td width={120}>Tax Number ID:</td>
                    <td>XXX</td>
                </tr>
                <tr><td>Fund Name:</td>
                    <td>YYY</td>
                </tr>
                <tr><td colSpan={2}>
                    <table className="ShareBlocks">
                        <tr className="firstHeaerRow">
                            <td rowSpan={2}>#</td>
                            <td className="columnLastCell" rowSpan={2}>Units</td>
                            <td className="columnLastCell" colSpan={2}>Purchase</td>
                            <td className="columnLastCell" colSpan={2}>Sale</td>
                            <td className="columnLastCell" colSpan={2}>Number of Holding Days</td>
                            <td className="columnLastCell" rowSpan={2}>16B</td>
                            <td colSpan={2}>16C</td>
                        </tr>
                        <tr className="secondHeaerRow">
                            <td className="leftAlignCell">Date</td>
                            <td className="columnLastCell rightAlignCell">Amount</td>
                            <td className="leftAlignCell">Date</td>
                            <td className="columnLastCell rightAlignCell">Amount</td>
                            <td className="rightAlignCell">2019</td>
                            <td className="rightAlignCell columnLastCell">2020</td>

                            <td className="rightAlignCell">2019</td>
                            <td className="rightAlignCell">2020</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className="columnLastCell">100</td>
                            <td>1/1/2019</td>
                            <td className="columnLastCell">$100</td>
                            <td>1/1/2020</td>
                            <td className="columnLastCell">$200</td>
                            <td>1</td>
                            <td className="columnLastCell">1</td>
                            <td className="columnLastCell">$1</td>
                            <td>$1</td>
                            <td>$1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className="columnLastCell">100</td>
                            <td>1/1/2019</td>
                            <td className="columnLastCell">$100</td>
                            <td>1/1/2020</td>
                            <td className="columnLastCell">$200</td>
                            <td>1</td>
                            <td className="columnLastCell">1</td>
                            <td className="columnLastCell">$1</td>
                            <td>$1</td>
                            <td>$1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className="columnLastCell">100</td>
                            <td>1/1/2019</td>
                            <td className="columnLastCell">$100</td>
                            <td>1/1/2020</td>
                            <td className="columnLastCell">$200</td>
                            <td>1</td>
                            <td className="columnLastCell">1</td>
                            <td className="columnLastCell">$1</td>
                            <td>$1</td>
                            <td>$1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className="columnLastCell">100</td>
                            <td>1/1/2019</td>
                            <td className="columnLastCell">$100</td>
                            <td>1/1/2020</td>
                            <td className="columnLastCell">$200</td>
                            <td>1</td>
                            <td className="columnLastCell">1</td>
                            <td className="columnLastCell">$1</td>
                            <td>$1</td>
                            <td>$1</td>
                        </tr>
                        <tr className="totalRow">
                            <td className="columnLastCell" colSpan={2}>Total</td>
                            <td></td>
                            <td className="columnLastCell">$100</td>
                            <td></td>
                            <td className="columnLastCell">$100</td>
                            <td></td>
                            <td className="columnLastCell"></td>
                            <td className="columnLastCell">100</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </table>
                </td></tr><tr><td className="summaryTitle" colSpan={2}>Summary</td></tr>
                <tr><td colSpan={2}>
                    <table className="summary">
                        <tr><td>Line 15e</td><td>Line 16b</td><td>Line 16c</td><td>Line 16d</td><td>Line 16e</td></tr>
                        <tr><td>100</td><td>100</td><td>100</td><td>100</td><td>100</td></tr>
                    </table>
                </td></tr></table>
        </div>
    }
}
