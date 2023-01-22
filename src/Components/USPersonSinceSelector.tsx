import React from "react";
import { JsxElement } from "typescript";
export interface aa
{
    value:string;
    onChange(e:any):void;
}
export class USPersonSinceSelector extends React.Component<aa> {
    handleChange = (e:any) => { this.props.onChange(e.target.value) };
    public render(): React.ReactNode {
        let years: number[] = [];
        for (let i = 2022; i >= 1950; i--) {
            years.push(i);
        }
        let listItems:JSX.Element[]=[];
        listItems.push(<option key="" value=""></option>);
        listItems.push(<option key="Birth" value="Birth">Birth</option>);
        listItems = listItems.concat(years.map((number) =>
            <option key={number} value={number}>{number}</option>
        ));
        return (
            <select value={this.props.value} onChange={this.handleChange}>
                {listItems}
            </select>
        );

    }
}