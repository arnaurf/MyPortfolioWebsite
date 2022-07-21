import React, { Component } from "react";

export default class HomePage extends Component{
    constructor(props){
        super(props);

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        
        fetch("/api/post", requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState(data));
    }

    render(){
        let text;
        if (this.state !== undefined && this.state !== null) {
            text = Object.values(this.state).map( data => 
                <div key={data.id} className="text" >
                    <h2>{data.title}</h2>
                    <h3>{data.subtitle}</h3>
                    <p>{data.description}</p>
                    <a href={data.github}>Github</a>
                </div>
            )
        } else {
            text = 'Loading';
        }

        return (
            <div>
                <div className="image">
                    <div className="top">
                        <div>
                            <h1 style={{margin: 0, paddingLeft: 10}} >Arnau Ruiz Fernández</h1>
                        </div>
                    </div>
                    <div className="content">
                        <div className = "sec1">
                            AAAAAAAAAAAAAAAAAAAAA
                        </div>
                    </div>
                </div>
                <div className = "sec2">
                    <div className="content">
                        <div className="sec2">{text}</div>
                    </div>
                </div>
            </div>
        )

    }

}