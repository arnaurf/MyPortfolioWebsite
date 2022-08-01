import React, { Component } from "react";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
/*

*/

export default class HomePage extends Component{
    constructor(props){
        super(props);

        
        this.state = {
            experience: [],
            projects: [],
            category: [],
            currentCategory: 0,
            form: {Name: '', Email: '', Message: ''},
            Name: 'a',
            Email: 'a@a.c',
            Message: 'asdf',
        }
        
    }
    componentDidMount(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/post", requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({projects: data}));

        fetch("/api/experience", requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({experience: data}));

        fetch("/api/category", requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({category: data}));
    }       
    render(){
        let projects;
        let category_text;
        const handleClick = (prop) => (this.setState({currentCategory: prop.target.id}));
        const handleSubmit = () => fetch("/api/create-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Name",
                email: "Email@a.com",
                message: "Message",
            }),
        })
        

        if (this.state !== undefined && this.state !== null) {
            let categories;
            category_text = (<div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" id="0" className="btn btn-secondary" onClick={handleClick}>All</button>
                {categories = Object.values(this.state.category).map( data => 
                        <button id={data.id} key={data.id} type="button" className="btn btn-secondary" onClick={handleClick}>{data.name}</button>
                )}       
            </div>)
        }else {
            category_text = '<br/>Loading';
        }

        if (this.state !== undefined && this.state !== null) {
            let query;
            if(this.state.currentCategory != 0){
                 query = this.state.projects.filter(result => result.id == this.state.currentCategory);}
            else{query = this.state.projects;}
            
            projects = Object.values(query).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", marginTop:"30px", paddingTop: "10px", backgroundColor: "transparent"}}> 
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.subtitle}</p>
                        <p className="card-text">{data.description}</p>

                        <a href={data.github} className="btn btn-outline-primary" target="_blank"><img src="static/images/icons/github2.png" id="btn-img"/> Github</a>
                    </div>
            )
        } else {
            projects = '<br/>Loading';
        }

        let experience;
        if (this.state !== undefined && this.state !== null) {
            experience = Object.values(this.state.experience).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", marginTop:"30px", paddingTop: "10px", backgroundColor: "transparent"}}> 
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">{data.date}</p>
                </div>
            )
        } else {
            experience = 'Loading';
        }
        



        return (
            <div>
                
                <nav className="navbar navbar-expand-lg navbar-light top" style={{paddingLeft:"30px", position: "fixed"}}>
                    <a className="navbar-brand" href="#">ARNAU RUIZ FERNÁNDEZ</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                                <a className="nav-link" href="#sec1">BIOGRAPHY</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#sec2">SKILLS</a>
                            </li>
                                
                            <li className="nav-item">
                                <a className="nav-link" href="#sec3">EXPIERENCE</a>
                            </li>
                                
                            <li className="nav-item">
                                <a className="nav-link" href="#sec4">PROJECTS</a>
                            </li>
                                
                            <li className="nav-item">
                                <a className="nav-link" href="#sec5">CONTACT</a>
                            </li>
                        </ul>
                    </div>

                </nav>


                <div id="sec1" className="row image text" style={{padding: "35px"}}>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="vertical-center">
                            <center>
                                    <img src="static/images/perfil.png" alt="Profile Photo" style={{margin: "15px"}}width={"250"}/>
                                    <br/>
                                    <span style={{color: "white", fontSize: "30px", margin: "10px", marginTop:"30px"}}>Arnau Ruiz Fernández</span><br/>
                                    <span style={{color: "#A6A6A6", fontSize: "17px", lineHeight: "0.1px"}}>Audiovisual Systems Engineer<br/>
                                        Programmer<br/>
                                        Musician<br/>
                                    </span>
                                    <div style={{marginTop: "8px"}}>
                                        <a href="https://github.com/arnaurf/" target="_blank"><img style={{margin: "10px"}} src="static/images/icons/github.png" alt="Github" width={"35"}/></a>
                                        <a href="https://www.linkedin.com/in/arnauruizfernandez/" target="_blank"><img style={{margin: "10px"}} src="static/images/icons/linkedin.png" alt="linkedin" width={"35"}/></a>
                                        <a href="mailto: arnauruiz1998@gmail.com" target="_blank"><img style={{margin: "10px"}} src="static/images/icons/mail.png" alt="Mail" width={"35"}/></a>
                                        <a href="static/docs/Arnau-Ruiz-Fernandez-CV.pdf" target="_blank"><img style={{margin: "10px"}} src="static/images/icons/cv.png" alt="CV" width={"35"}/></a>
                                    </div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-6" style={{padding: "60px", color: "white"}}>
                        <h4>Biography</h4><br/>
                        <p>Hi, I am Arnau Ruiz a 24-year-old engineer. I have recently graduated in Audiovisual Systems Engineering at Pompeu Fabra University, Barcelona.</p>

                        <p>When I was a child, I started being interested in audio, programming, image and video editing, and I started learning Arduino, Processing, and databases. When I was a teenager, I also started recording and mixing music. On the other hand, I have been playing guitar since I was 9 and bass guitar since I was 16. I wanted to learn more about programming and audio science and for that reason, I chose studying Audiovisual Systems Engineering.</p>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <h3>- Interests</h3>
                                <ul>
                                    <li>Audio programming</li>
                                    <li>Computer Graphics</li>
                                    <li>Full-Stack Development</li>
                                    <li>Software Engineering</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h3>- Education</h3>
                                <ul>
                                Audiovisual Systems Engineering, 2016-2021<br/>
                                <span style={{color: "#C8C8C8", fontSize:"13px"}}>@ Pompeu Fabra Univesity</span>
                                </ul>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="col-md-1"></div>
                </div>
                
                <div id="sec2" className="row text" style={{padding: "20px"}}>
                    <center>
                        <div className="row" style={{padding: "20px"}}>
                            <b style={{fontSize:"40px", color:"black"}}>Skills</b>
                        </div>
                        <div className="row" style={{padding: "20px"}}>
                            <div className="col-md"></div>
                            <div className="col-md">
                                <img src="static/images/icons/signal.png" alt="Signal and audio processing" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Signal Processing and Audio</span><br/>
                                <span style={{fontSize:"15px"}}>Matlab, Jupyter Notebook, JUCE, VST</span>
                            </div>
                            <div className="col-md">
                                <img src="static/images/icons/graphics.png" alt="Computer Graphics" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Computer Graphics</span><br/>
                                <span style={{fontSize:"15px"}}>Realtime and Volumetric rendering, PBR, OpenGL, Unity, Unreal Engine</span>
                            </div>
                            <div className="col-md">
                                <img src="static/images/icons/fullstack.png" alt="Full-Stack" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Full-Stack</span><br/>
                                <span style={{fontSize:"15px"}}>Django, React, Node.js, CSS, HTML, Bootstrap, REST, MySQL</span>
                            </div>
                            <div className="col-md"></div>
                        </div>
                        <div className="row" style={{padding: "30px"}}>
                            <div className="col-md"></div>
                            <div className="col-md">
                                <img src="static/images/icons/code.png" alt="Programming Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Programming Languages</span><br/>
                                <span style={{fontSize:"15px"}}>C++, Matlab, Python<br/>Also C, Javascript, Java, Processing/Arduino</span>
                            </div>
                            <div className="col-md">
                                <img src="static/images/icons/tools.png" alt="Tools" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Tools</span><br/>
                                <span style={{fontSize:"15px"}}>Visual Code/Studio, Netbeans, Pycharm, Trello, Github, Photoshop, Premiere Pro, Audacity, Pro Tools, Reaper</span>
                            </div>
                            <div className="col-md">
                                <img src="static/images/icons/language.png" alt="Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Languages</span><br/>
                                <span style={{fontSize:"15px"}}>English, Spanish, Catalan</span>
                            </div>
                            <div className="col-md"></div>
                        </div>
                    </center>
                </div>


                <div id="sec3" className="row" style={{backgroundColor: "#ededec", paddingTop: "100px", paddingBottom: "100px", fontFamily: 'Open Sans'}}>
                    
                        <div className="col-md-5"><b style={{fontSize:"40px", color:"black"}}><center>Expierence</center></b></div>
                        <div className="col-md-7">{experience}</div>
                   
                </div>

                <div id="sec4" className="row" style={{paddingTop: "100px", paddingBottom: "100px", fontFamily: 'Open Sans'}}>
                        <div className="col-md-5">
                            <b style={{fontSize:"40px", color:"black"}}>
                            <center>Projects
                            </center>
                            </b>
                        </div>
                        <div className="col-md-7">
                            {category_text}
                            {projects}
                        </div>
                    
                
                </div>

                <div id="sec5" className="row text" style={{padding: "20px", backgroundColor: "#ededec"}}>
                    <center>
                        <div className="row" style={{padding: "20px"}}>
                            <b style={{fontSize:"40px", color:"black"}}>Contact</b>
                        </div>
                    </center>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="name" className="form-control" id="formName" placeholder="Name" onChange={ (e) => this.setState({Name: e.target.value})}/><br/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="formEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={ (e) => this.setState({Email: e.target.value})}/><br/>
                            </div>
                            <div className="form-group">
                                <textarea  type="textArea" className="form-control" id="formMessage" placeholder="Enter Message" onChange={ (e) => this.setState({Message: e.target.value})}/><br/>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                    
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


/*
boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)



                <div className="row top">
                    <div className="col-md-6 ">
                        <h1 style={{margin: 0, paddingLeft: 30}} >ARNAU RUIZ FERNÁNDEZ</h1>
                    </div>
                    <div className="col-md-6">
                        <h1 style={{margin: 0, paddingTop:"3px", paddingLeft: 30, fontSize:"15px", textAlign:"right"}} >BIOGRAPHY | SKILLS | EXPIERENCE | PROJECTS | CONTACT</h1>
                    </div>
                </div>
*/