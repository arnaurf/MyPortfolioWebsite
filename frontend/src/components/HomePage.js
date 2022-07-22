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
                
                <div className="row top">
                    <div className="col-md-6">
                        <h1 style={{margin: 0, paddingLeft: 30}} >ARNAU RUIZ FERNÁNDEZ</h1>
                    </div>
                    <div className="col-md-6">
                        <h1 style={{margin: 0, paddingTop:"3px", paddingLeft: 30, fontSize:"15px", textAlign:"right"}} >BIOGRAPHY | SKILLS | EXPIERENCE | PROJECTS | CONTACT</h1>
                    </div>
                </div>
                <div className="row image text" style={{padding: "35px"}}>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="vertical-center">
                            <center>
                                    <img src="static/images/perfil.png" alt="Profile Photo" width={"250"}/>
                                    <br/>
                                    <span style={{color: "white", fontSize: "30px", padding: "10px", marginTop:"15px"}}>Arnau Ruiz Fernández</span><br/>
                                    <span style={{color: "#A6A6A6", fontSize: "17px", lineHeight: "0.1px"}}>Audiovisual Systems Engineer<br/>
                                        Programmer<br/>
                                        Musician<br/>
                                    </span>
                                    <div style={{marginTop: "8px"}}>
                                        <img style={{margin: "10px"}} src="static/images/skype.png" alt="Profile Photo" width={"35"}/>
                                        <img style={{margin: "10px"}} src="static/images/skype.png" alt="Profile Photo" width={"35"}/>
                                        <img style={{margin: "10px"}} src="static/images/skype.png" alt="Profile Photo" width={"35"}/>
                                    </div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-6" style={{padding: "10px", color: "white"}}>
                        <h4>Biography</h4>
                        <p>
                            Hi, I’m Man Parvesh, currently working as a Software Engineer (Member of Technical Staff) at VMware in the SRE Automation Platform team. I have a Master’s degree in CS from UT Dallas and a Bachelor of Technology degree from the Indian Institute of Technology (IIT) Guwahati.
                        </p>
                        <p>
                            Previously, I worked at Works Applications, Singapore as a Software Engineer, where I worked on delivering libraries, microservices and distributed multi-tenant architecture to thousands of developers inside the company who utilized them to build various products for our customers. Aside from work, I am also an open-source enthusiast and have created projects that were listed in GitHub trending.
                        </p>
                        <p>
                            My interests lie in solving problems related to large-scale distributed software systems
                        </p>
                        <list>Interests
                            <li>Distributed Computing</li>
                            <li>Cloud Computing</li>
                            <li>Software Engineering</li>
                            <li>Information Security</li>
                        </list>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row text" style={{padding: "20px"}}>
                    <center>
                        <div className="row" style={{padding: "20px"}}>
                            <b style={{fontSize:"40px", color:"black"}}>Skills</b>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img src="static/images/skype.png" alt="Profile Photo" width={"60"}/><br/>
                                <b style={{fontSize:"35px"}}>C++</b><br/>
                                <span>Something about C++</span>
                            </div>
                            <div className="col-md-4">
                                <img src="static/images/skype.png" alt="Profile Photo" width={"60"}/><br/>
                                <b style={{fontSize:"35px"}}>C++</b><br/>
                                <span>Something about C++</span>
                            </div>
                            <div className="col-md-4">
                                <img src="static/images/skype.png" alt="Profile Photo" width={"60"}/><br/>
                                <b style={{fontSize:"35px"}}>C++</b><br/>
                                <span>Something about C++</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-4">

                            </div>
                        </div>
                    </center>
                </div>
                {/*
                <div className="image">
                    <div className="sec1">
                        <div className = "content">
                            CONTENT
                        </div>
                    </div>
                </div>

                <div className = "sec2">
                    <div className="content">
                        asdf
                    </div>
                </div>
                <div className = "sec3">
                    <div className="content">{text}</div>
                </div>
        */}
            </div>
        )

    }

}