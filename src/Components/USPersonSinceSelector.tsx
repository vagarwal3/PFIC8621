import React from "react";
import { JsxElement } from "typescript";
export interface aa
{
    onChange(e:any):void;
}
export class USPersonSinceSelector extends React.Component<aa> {
    handleChange = (e:any) => { this.props.onChange(e) };
    public render(): React.ReactNode {
        let years: number[] = [];
        for (let i = 2022; i >= 1950; i--) {
            years.push(i);
        }
        let listItems:JSX.Element[]=[];
        listItems.push(<option key="" value=""></option>);
        listItems.push(<option key="Birth" value="Birth">{"Birth"}</option>);
        listItems = listItems.concat(years.map((number) =>
            <option key={number} value={number}>{number}</option>
        ));
        return (
            <select onChange={this.handleChange}>
                {listItems}
            </select>
        );

    }
}