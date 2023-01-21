import * as React from "react"
import ReactDOM from "react-dom"
export interface IPFIC
{
    value:string;
}
class PFICGUI extends React.Component<IPFIC>{
    public render():JSX.Element
    {

        return <div>React: {this.props.value}</div>
    }
}
ReactDOM.render(<PFICGUI value="test" />,document.getElementById('reactRoot'))