import { Create } from "@material-ui/icons";
import React, { Component } from "react";
import { render } from "react-dom";
import  HomePage  from "./HomePage";



export default class App extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={{margin: 0, padding: 0}}>
                <HomePage />
            </div>
        )
    }

}

const appDiv = document.getElementById('app');
render(<App />, appDiv)