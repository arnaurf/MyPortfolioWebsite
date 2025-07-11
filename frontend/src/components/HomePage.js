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
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken || ''} />
    );
};
/*

*/
$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});


export default class HomePage extends Component{
    constructor(props){
        super(props);

        
        this.state = {
            experience: [],
            projects: [],
            category: [],
            currentCategory: 0,
            Name: '',
            Email: '',
            Message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name
        this.setState({[name]: target.value});
    }

    //handleSubmit = () => fetch("/api/create-form", {
    handleSubmit(){
        fetch("/api/create-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.Name,
                email: this.state.Email,
                message: this.state.Message,
            }),
        })
        this.setState({Name: '', Email: '', Message: ''});
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
        const handleClick = (prop) =>{ (this.setState({currentCategory: prop.target.id}))
        console.log(prop.target)   
    };
        
        

        if (this.state !== undefined && this.state !== null) {
            let categories;
            category_text = (<div className="btn-group" style={{paddingTop: "25px"}} role="group" aria-label="Basic example">
                <button type="button" id="0" className="btn btn-secondary" onClick={handleClick} style={{fontSize: "15px"}}>
                    All
                </button>
                {categories = Object.values(this.state.category).map( data => 
                        <button id={data.id} key={data.id} type="button"  className="btn btn-secondary" onClick={handleClick} style={{fontSize: "15px"}}>
                            {data.name}
                        </button>
                )}       
            </div>)
        }else {
            category_text = '<br/>Loading';
        }

        if (this.state !== undefined && this.state !== null) {
            let query;
            if(this.state.currentCategory != 0){
                 query = this.state.projects.filter(result => result.category == this.state.currentCategory);}
            else{query = this.state.projects;}
            projects = Object.values(query).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", marginTop:"30px", paddingTop: "10px", backgroundColor: "transparent"}}> 
                        <h5 className="card-title">{data.title}</h5>
                        {/*<p className="card-text">{data.subtitle}</p>*/}
                        <p className="card-text" style={{whiteSpace: "pre-line",  fontSize:"15px"}}>{data.description}</p>

                        <a href={data.github} className="btn btn-outline-primary" target="_blank"><img src="static/images/icons/github2.png" id="btn-img"/> Github</a>
                        <hr></hr>
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
                    <hr></hr>
                </div>
            )
        } else {
            experience = 'Loading';
        }
        



        return (

            
            <div>
                <nav className="navbar navbar-expand-lg navbar-light top" style={{paddingLeft:"30px", paddingRight:"30px", position: "fixed"}}>
                    <div className="d-none d-lg-inline-flex">
                        <a className="navbar-brand" href="/">ARNAU RUIZ</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="container justify-content-center">
                        <div className="navbar-brand-mobile-wrapper d-inline-flex d-lg-none ">
                            <a className="navbar-brand" href="/">ARNAU RUIZ</a>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
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


                <div id="sec1" className="image text " style={{paddingTop: "70px", paddingBottom: "50px"}}>
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ marginTop: "50px" }}>
                            <div className="col-12 col-lg-6" style={{ maxWidth: "400px" }}>
                                <center>
                                <img src="static/images/perfil.png" alt="Profile Photo" style={{ margin: "0px" }} width={"250"} />
                                <br />
                                <span style={{ color: "#f7ece3", fontSize: "50px", margin: "10px", marginTop: "30px"}}>
                                    Arnau Ruiz
                                </span><br />
                                <strong style={{ fontSize: "0.9rem", color: "#eee4ddff" }}>Recordings Operations Engineer</strong><br />
                                <span style={{ color: "#f7c6b5" }}>BMAT Music Innovators</span><br />

                                <div style={{ marginTop: "8px" }}>
                                    <a href="https://github.com/arnaurf/" target="_blank"><img style={{ margin: "10px" }} src="static/images/icons/github.png" alt="Github" width={"35"} /></a>
                                    <a href="https://www.linkedin.com/in/arnauruizfernandez/" target="_blank"><img style={{ margin: "10px" }} src="static/images/icons/linkedin.png" alt="linkedin" width={"35"} /></a>
                                    <a href="mailto: arnauruiz1998@gmail.com" target="_blank"><img style={{ margin: "10px" }} src="static/images/icons/mail.png" alt="Mail" width={"35"} /></a>
                                </div>
                                </center>
                            </div>

                            <div className="col-12 col-lg-6" style={{ maxWidth: "800px", paddingTop: "0px", color: "hsla(27, 56%, 92%, 1.00)" }}>
  
                                <h2 style={{ textAlign: "left", fontSize: "2rem", fontWeight: "700", marginBottom: "20px", color: "hsla(25, 50%, 95%, 0.90)   " }}>
                                    Engineering from Barcelona, blending technology and art
                                </h2>
                                <hr style={{ borderColor: "#FFFF", margin: "30px auto", width: "95%" }} /> 
                                <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                    I’m an <strong>Audiovisual Systems Engineer</strong> from Pompeu Fabra University with a strong interest in{" "}
                                    <span style={{ color: "#ff6f61" }}>programming</span>,{" "}
                                    <span style={{ color: "#ff6f61" }}>Linux environments</span>, and{" "}
                                    <span style={{ color: "#ff6f61" }}>audio technology</span>. 
                                </p>

                                <p style={{ fontSize: "1rem", lineHeight: "1.6", marginTop: "25px" }}>
                                    I combine a technical mindset with a creative spirit, aiming to build solutions that blend <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>technology</span> and <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>art</span>.
                                </p>

                                </div>

                        </div>

                    </div>
                </div>
                
                <div id="sec2" className="row text" style={{padding: "80px"}}>
                    <center>

                        <div className="row justify-content-center">
                            <div className="col-md-3" style={{paddingTop: "40px"}}>
                                <img src="static/images/icons/signal.png" alt="Signal and audio processing" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Signal Processing and Audio</span><br/>
                                <span style={{fontSize:"15px"}}>Ffmpeg, Matlab, Jupyter Notebook, JUCE, VST</span>
                            </div>
                            <div className="col-md-3" style={{paddingTop: "40px"}}>
                                <img src="static/images/icons/graphics.png" alt="Computer Graphics" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Systems</span><br/>
                                <span style={{fontSize:"15px"}}>Linux, Puppet, Check mk, FTP, streaming protocols, broadcasting systems</span>
                            </div>
                            <div className="col-md-3" style={{paddingTop: "40px"}}>
                                <img src="static/images/icons/code.png" alt="Programming Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Programming Languages</span><br/>
                                <span style={{fontSize:"15px"}}>Python, C++, Bash<br/>Also Matlab, C, Processing/Arduino</span>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-3" style={{paddingTop: "60px"}}>
                                <img src="static/images/icons/language.png" alt="Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Languages</span><br/>
                                <span style={{fontSize:"15px"}}>English, Spanish, Catalan</span>
                            </div>
                            <div className="col-md-3" style={{paddingTop: "60px"}}>
                                <img src="static/images/icons/tools.png" alt="Tools" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>More!</span><br/>
                                <span style={{fontSize:"15px"}}>Git, Photoshop, Premiere Pro, Pro Tools, Reaper, OpenGL and computer rendering, </span>
                            </div>
                            <div className="col-md-3" style={{paddingTop: "60px"}}>
                                <img src="static/images/icons/fullstack.png" alt="Full-Stack" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"black"}}>Web Development</span><br/>
                                <span style={{fontSize:"15px"}}>Django, React, Node.js, Bootstrap, CSS, HTML, Javascript, REST, SQL</span>
                            </div>
                        </div>
                    </center>
                </div>


                <div id="sec3" className="row justify-content-sm-center justify-content-center" style={{backgroundColor: "rgba(250, 246, 243, 1)", paddingTop: "100px", paddingBottom: "100px", fontFamily: 'Open Sans'}}>
                    
                        <div className="col-md-4"><b style={{fontSize:"40px", color:"rgba(30, 30, 30, 1)"}}><center>Expierence</center></b></div>
                        <div className="col-md-8 col-sm-8 col-8">{experience}</div>
                    
                </div>

                <div id="sec4" className="row justify-content-sm-center justify-content-center" style={{paddingTop: "100px", paddingBottom: "100px", fontFamily: 'Open Sans'}}>
                        <div className="col-md-4"><b style={{fontSize:"40px", color:"rgba(30, 30, 30, 1)"}}><center>Projects</center></b></div>
                        <div className="col-md-8 col-sm-8 col-8">
                            {category_text}
                            {projects}
                        </div>
                    
                
                </div>

                <div id="sec5" className="row text" style={{padding: "20px", backgroundColor: "rgba(250, 246, 243, 1)"}}>
                    <center>
                        <div className="row" style={{padding: "20px"}}>
                            <b style={{fontSize:"40px", color:"rgba(30, 30, 30, 1)"}}>Contact</b>
                        </div>
                    </center>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <CSRFToken/>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input value={this.state.Name} name="Name" className="form-control" id="formName" placeholder="Name" onChange={this.handleChange}/><br/>
                            </div>
                            <div className="form-group">
                                <input value={this.state.Email} name="Email" className="form-control" id="formEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/><br/>
                            </div>
                            <div className="form-group">
                                <textarea value={this.state.Message} name="Message" className="form-control" id="formMessage" placeholder="Enter Message" onChange={this.handleChange}/><br/>
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