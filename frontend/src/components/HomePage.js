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
        const handleClick = (prop) =>{ (this.setState({currentCategory: prop.target.id})) };

        if (this.state !== undefined && this.state !== null) {
            let categories;
            const allBtnClass = `btn btn-secondary ${this.state.currentCategory == 0 ? 'active' : ''}`;
            category_text = (<div className="btn-group" style={{margin: "15px"}} role="group" aria-label="Basic example">
                <button type="button" id="0" className={allBtnClass} onClick={handleClick} style={{fontSize: "15px"}}>
                    All
                </button>
                {categories = Object.values(this.state.category).map( data => {
                    const btnClass = `btn btn-secondary ${data.id == this.state.currentCategory ? 'active' : ''}`;
                    return (
                        <button id={data.id} key={data.id} type="button"  className={btnClass} onClick={handleClick} style={{fontSize: "15px"}}>
                            {data.name}
                        </button>
                    );
                })}
                </div>
            )
        }else {
            category_text = '<br/>Loading';
        }

        if (this.state !== undefined && this.state !== null) {
            let query;
            if(this.state.currentCategory != 0){
                 query = this.state.projects.filter(result => result.category == this.state.currentCategory);}
            else{query = this.state.projects;}

            projects = Object.values(query).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", margin:"15px", marginBottom: "50px", backgroundColor: "transparent"}}> 
                    <h5 className="card-title" style={{color: "hsl(5, 100%, 69%)"}}>{data.title}</h5>
                    <p className="card-text" style={{color: "#151515ff"}}>{data.subtitle}</p>
                    <hr></hr>
                    <p className="card-text" style={{whiteSpace: "pre-line",  fontSize:"15px"}}>{data.description}</p>
                    <a href={data.github} className="btn btn-outline-primary" target="_blank"><img src="static/images/icons/github2.png" id="btn-img"/> Github</a>
                </div>
            )
        } else {
            projects = '<br/>Loading';
        }

        let experience;
        if (this.state !== undefined && this.state !== null) {
            experience = Object.values(this.state.experience).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", margin:"15px", backgroundColor: "transparent"}}> 
                    <h5 className="card-title" style={{color: "hsl(5, 100%, 69%)"}}>{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">{data.date}</p>
                    <hr></hr>
                    <br></br>
                </div>
            )
        } else {
            experience = 'Loading';
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light px-3 top" style={{position: "fixed"}}>
                    <div className="container-fluid d-flex align-items-center">
                        {/* Left button, only for mobile*/}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>   

                        <a className="navbar-brand mx-auto mx-lg-0" href="/" style={{ whiteSpace: "nowrap" }}>
                            ARNAU RUIZ&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>

                        {/* Empty div at right column to compensate in mobile format*/}
                        <div className="d-lg-none" style={{ width: "40px" }}></div>

                        {/* Desktop + collapsable nav */}
                        <div className="collapse navbar-collapse justify-content-end d-lg-flex" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#sec1">BIOGRAPHY</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#sec2">SKILLS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#sec3">WORK</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#sec4">PROJECTS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#sec5">CONTACT</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* FIRST SECTION - PRESENTATION - HEADER*/}
                <div id="sec1" className="image text " style={{paddingBlock: "100px"}}>
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ marginTop: "50px" }}>
                            <div className="col-12 col-lg-6 mb-5 mb-lg-0" style={{ maxWidth: "400px" }}>
                                <center>
                                    <img src="static/images/perfil.png" alt="Profile Photo" style={{ margin: "0px" }} width={"250"} />
                                    <br />
                                    <span style={{ color: "hsla(25, 50%, 100%, 0.95)", fontSize: "50px", margin: "10px", marginTop: "30px"}}>
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

                            <div className="col-12 mb-5 col-lg-6" style={{ maxWidth: "800px", paddingTop: "0px", color: "hsla(27, 56%, 92%, 1.00)" }}>
                                <h2 style={{ textAlign: "left", fontSize: "2rem", fontWeight: "700", marginBottom: "20px", color: "hsla(25, 50%, 100%, 0.90)" }}>
                                    <p className="text-center text-lg-start">Engineering from Barcelona, blending technology and art</p>
                                </h2>
                                <hr style={{ borderColor: "#FFFF", margin: "30px auto", width: "95%" }} /> 
                                <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                    I’m an <strong>Audiovisual Systems Engineer</strong> from Pompeu Fabra University with a strong interest in{" "}
                                    <span style={{ color: "#ff6f61" }}>programming</span>,{" "}
                                    <span style={{ color: "#ff6f61" }}>audio technology</span>, and{" "}
                                    <span style={{ color: "#ff6f61" }}>Linux environments</span>. 
                                </p>

                                <p style={{ fontSize: "1rem", lineHeight: "1.6", marginTop: "25px" }}>
                                    I combine a technical mindset with a creative spirit, aiming to build solutions that blend <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>technology</span> and <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>art</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2 - SKILLS */}
                <div id="sec2" className="row text" style={{padding: "80px"}}>
                    <center>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/signal.png" alt="Signal and audio processing" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Audio and Signal Processing</span><br/>
                                <span style={{fontSize:"15px"}}>Ffmpeg, Matlab, JUCE, ReaScript (Reaper), Pure Data</span>
                            </div>
                            <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/graphics.png" alt="Computer Graphics" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Systems</span><br/>
                                <span style={{fontSize:"15px"}}>Linux, Puppet, Check MK, FTP, streaming protocols, broadcasting systems</span>
                            </div>
                            <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/code.png" alt="Programming Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Programming Languages</span><br/>
                                <span style={{fontSize:"15px"}}>Python, C++, Bash<br/>Also Matlab, C, Processing/Arduino</span>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/language.png" alt="Languages" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Languages</span><br/>
                                <span style={{fontSize:"15px"}}>English, Spanish, Catalan</span>
                            </div>
                            <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/fullstack.png" alt="Full-Stack" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Web Development</span><br/>
                                <span style={{fontSize:"15px"}}>Django, React, Node.js, Bootstrap, CSS, HTML, Javascript, REST, SQL</span>
                            </div>
                            <div className="col-lg-3" style={{margin: "10px", minWidth: "250px"}}>
                                <img src="static/images/icons/tools.png" alt="Tools" width={"60"} style={{marginBottom: "5px"}}/><br/>
                                <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>More!</span><br/>
                                <span style={{fontSize:"15px"}}>Git, Photoshop, Premiere Pro, Pro Tools, Reaper, OpenGL and computer rendering, </span>
                            </div>
                        </div>
                    </center>
                </div>

                {/* SECTION 3 - EXPERIENCE - JOBS */}
                <div id="sec3" className="row justify-content-sm-center justify-content-center" style={{backgroundColor: "hsl(26, 60%, 97%)", padding: "60px", fontFamily: 'Open Sans'}}>
                    <div className="col-lg-4 d-flex">
                        <div className="mx-auto text-center text-lg-start" style={{ width: "200px", margin: "10px" }}>
                            <b style={{ fontSize: "40px", color: "rgba(64, 64, 64, 1)" }}>
                                Work
                            </b>
                        </div>
                    </div>
                    <div className="col-lg-8 col-sm-8 col-8"><br></br>{experience}</div>
                </div>

                {/* SECTION 4 - PROJECTS - GITHUB */}
                <div id="sec4" className="row justify-content-sm-center justify-content-center" style={{padding: "60px", fontFamily: 'Open Sans'}}>
                    <div className="col-lg-4 d-flex">
                        <div className="mx-auto text-center text-lg-start" style={{ width: "200px", padding: "10px" }}>
                            <b style={{ fontSize: "40px", color: "rgba(64, 64, 64, 1)" }}>
                                Projects
                            </b>
                        </div>
                    </div>

                    <div className="col-lg-8 col-sm-8 col-8">
                        <br></br>
                        {category_text}
                        {projects}
                    </div>
                </div>

                {/* SECTION 5 - CONTACT FORM */}
                <div id="sec5" className="row text" style={{padding: "20px", minWidth: "150px", backgroundColor: "hsl(26, 60%, 97%)"}}>
                    <center>
                        <div className="row" style={{padding: "20px", minWidth: "150px"}}>
                            <b style={{fontSize:"40px", color:"rgba(64, 64, 64, 1)"}}>Contact</b>
                        </div>
                    </center>
                    <div className="row" style={{padding: "10px"}}>
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
                </div>
            </div>
        )
    }
}
