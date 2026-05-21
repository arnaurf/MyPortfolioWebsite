import React, { Component } from "react";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim(); 
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
            isNavOpen: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name
        this.setState({[name]: target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const response = await fetch("/api/create-form/", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
                body: JSON.stringify({
                    name: this.state.Name,
                    email: this.state.Email,
                    message: this.state.Message,
                }),
            });
            if (response.ok) {
                console.log("Formulario enviado con éxito.");
                this.setState({Name: '', Email: '', Message: ''}); 
            } else {
                console.error("Error when submiting the Contact form: ", response.status);
                const errorData = await response.json();
                console.error("Error:", errorData);
            }
        } catch (error) {
            console.error("Connection error: ", error);
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

        // Scroll suave al cargar si hay ruta
        const path = window.location.pathname.replace('/', '');
        if (path && path !== "") {
            setTimeout(() => {
                const element = document.getElementById(path);
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                }
            }, 500); 
        }
    }

    handleNavClick = (e, targetId) => {
        e.preventDefault(); 
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, null, `/${targetId}`);
        }
    };

    render(){
        let projects;
        let category_text;
        const handleClick = (prop) => { this.setState({currentCategory: prop.target.id}) };

        if (this.state !== undefined && this.state !== null) {
            let categories;
            const allBtnClass = `btn btn-secondary ${this.state.currentCategory == 0 ? 'active' : ''}`;
            category_text = (
                <div className="btn-group" style={{margin: "15px"}} role="group" aria-label="Basic example">
                    <button type="button" id="0" className={allBtnClass} onClick={handleClick} style={{fontSize: "15px"}}>
                        All
                    </button>
                    {categories = Object.values(this.state.category).map( data => {
                        const btnClass = `btn btn-secondary ${data.id == this.state.currentCategory ? 'active' : ''}`;
                        return (
                            <button id={data.id} key={data.id} type="button" className={btnClass} onClick={handleClick} style={{fontSize: "15px"}}>
                                {data.name}
                            </button>
                        );
                    })}
                </div>
            )
        } else {
            category_text = '<br/>Loading';
        }

        if (this.state !== undefined && this.state !== null) {
            let query;
            if(this.state.currentCategory != 0){
                 query = this.state.projects.filter(result => result.category == this.state.currentCategory);}
            else{query = this.state.projects;}

            projects = Object.values(query).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", margin:"15px", marginBottom: "50px", backgroundColor: "transparent"}}> 
                    <h3 className="h5 card-title" style={{color: "hsl(5, 100%, 69%)"}}>{data.title}</h3>
                    <p className="card-text" style={{color: "#151515ff"}}>{data.subtitle}</p>
                    <hr></hr>
                    <p className="card-text" style={{whiteSpace: "pre-line",  fontSize:"15px"}}>{data.description}</p>
                    <a href={data.github} className="btn btn-outline-primary" aria-label={`Github url for ${data.title}`} target="_blank" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="btn-icon-svg" width="20" height="20" style={{ marginRight: "8px", verticalAlign: "middle" }} fill="currentColor">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                                <path d="M2380 5114 c-19 -2 -78 -9 -130 -15 -216 -24 -518 -107 -710 -195 -324 -148 -567 -319 -815 -575 -887 -913 -968 -2337 -190 -3334 411 -526 982 -861 1650 -967 201 -32 549 -32 750 0 556 88 1043 333 1433 723 836 832 990 2107 379 3124 -183 306 -474 610 -772 810 -323 216 -680 353 -1070 411 -96 14 -453 27 -525 18z m510 -319 c366 -56 718 -206 1029 -438 116 -86 334 -302 418 -412 201 -267 340 -550 413 -844 211 -845 -76 -1715 -751 -2277 -164 -138 -394 -274 -601 -357 l-88 -35 0 341 c0 374 -9 466 -54 578 -14 34 -24 64 -23 65 1 1 44 16 96 33 482 161 790 500 882 971 20 98 17 376 -5 480 -35 173 -92 319 -176 449 l-51 80 12 63 c18 94 16 338 -4 426 -35 154 -109 250 -212 273 -130 29 -332 -37 -590 -191 l-80 -48 -115 24 c-297 62 -642 57 -912 -12 l-56 -14 -77 45 c-114 67 -251 135 -329 161 -103 35 -224 50 -281 34 -95 -27 -168 -125 -202 -272 -20 -88 -22 -332 -4 -426 l12 -63 -51 -80 c-84 -130 -141 -276 -176 -449 -22 -104 -25 -382 -5 -480 92 -471 400 -810 882 -971 52 -17 95 -32 96 -33 1 -1 -8 -29 -22 -61 -13 -33 -30 -91 -38 -130 -13 -68 -15 -70 -53 -84 -63 -23 -191 -19 -240 6 -62 33 -101 69 -146 137 -107 158 -190 240 -303 299 -62 33 -155 57 -215 57 l-46 0 13 -137 c6 -76 12 -144 13 -150 0 -7 10 -13 23 -13 41 0 121 -46 167 -96 25 -27 67 -82 94 -122 27 -41 77 -100 110 -133 128 -127 347 -194 524 -160 l42 8 0 -203 0 -202 -87 35 c-970 390 -1547 1384 -1398 2409 56 384 208 737 458 1069 84 110 302 326 418 412 355 266 726 409 1184 457 82 8 404 -4 505 -19z m-1380 -919 c70 -22 156 -64 275 -135 61 -36 123 -72 139 -78 42 -19 111 -16 232 11 175 39 289 49 473 43 126 -5 195 -12 286 -32 151 -34 240 -41 280 -23 17 7 81 44 144 82 131 78 249 132 308 142 l41 6 9 -48 c13 -79 7 -282 -11 -350 -30 -115 -22 -151 54 -254 65 -88 124 -213 157 -335 23 -88 27 -119 27 -255 1 -164 -17 -265 -66 -378 -108 -247 -330 -442 -612 -536 -106 -35 -181 -52 -366 -82 -85 -14 -155 -26 -157 -27 -3 -4 71 -116 157 -237 84 -118 105 -160 119 -235 7 -36 11 -206 11 -435 l0 -376 -72 -12 c-114 -19 -263 -31 -378 -31 -115 0 -264 12 -377 31 l-73 12 0 370 c0 207 5 399 10 435 13 78 34 120 120 241 86 121 160 233 157 237 -2 1 -72 13 -157 27 -185 30 -260 47 -366 82 -282 94 -504 289 -612 536 -49 113 -67 214 -66 378 0 136 4 167 27 255 33 122 92 247 157 335 76 103 84 139 54 254 -18 68 -24 271 -11 349 9 53 15 55 87 33z" />
                            </g>
                        </svg>
                        Github
                    </a>
                </div>
            )
        } else {
            projects = '<br/>Loading';
        }

        let experience;
        if (this.state !== undefined && this.state !== null) {
            experience = Object.values(this.state.experience).map( data => 
                <div key={data.id} className="card-2" style={{width: "90%", margin:"15px", backgroundColor: "transparent"}}> 
                    <h3 className="h5 card-title" style={{color: "hsl(5, 100%, 69%)"}}>{data.title}</h3>
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
                <nav className="navbar navbar-expand-lg navbar-light px-3 top" style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
                    <div className="container-fluid position-relative d-flex justify-content-between align-items-center">

                        {/* MOBILE: Left Menu toggle con atributos de Bootstrap 5 nativos */}
                        <button className="navbar-toggler d-lg-none" type="button" onClick={() => this.setState({ isNavOpen: !this.state.isNavOpen })} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* DESKTOP: Left Title */}
                        <a className="navbar-brand mx-auto d-none d-lg-block" href="/" style={{ whiteSpace: "nowrap" }} >
                            ARNAU RUIZ
                        </a>

                        {/* MOBILE: Center Title */}
                        <a className="navbar-brand position-absolute d-lg-none start-50 top-0 translate-middle-x" href="/" style={{ whiteSpace: "nowrap" }} >
                            ARNAU RUIZ
                        </a>

                        <div className="d-lg-none" style={{ width: "40px" }}></div>

                        {/* Right: Nav links */}
                        <div className={`collapse navbar-collapse justify-content-end d-lg-flex ${this.state.isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/bio" onClick={(e) => { this.handleNavClick(e, 'bio'); this.setState({ isNavOpen: false }); }}>BIOGRAPHY</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/skills" onClick={(e) => { this.handleNavClick(e, 'skills'); this.setState({ isNavOpen: false }); }}>SKILLS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/experience" onClick={(e) => { this.handleNavClick(e, 'experience'); this.setState({ isNavOpen: false }); }}>WORK</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/projects" onClick={(e) => { this.handleNavClick(e, 'projects'); this.setState({ isNavOpen: false }); }}>PROJECTS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/contact" onClick={(e) => { this.handleNavClick(e, 'contact'); this.setState({ isNavOpen: false }); }}>CONTACT</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main>
                    {/* BIOGRAPHY */}
                    <div id="bio" className="image text " style={{paddingBlock: "100px"}}>
                        <div className="container">
                            <div className="row justify-content-center align-items-center" style={{ marginTop: "50px" }}>
                                <div className="col-12 col-lg-6 mb-5 mb-lg-0" style={{ maxWidth: "400px" }}>
                                    <center>
                                        <img src="static/images/perfil.webp" fetchpriority="high" alt="Profile Photo" style={{ margin: "0px" }} width={"250"} height={"253"} />
                                        <br />
                                        <span style={{ color: "hsla(25, 50%, 100%, 0.95)", fontSize: "50px", margin: "10px", marginTop: "30px"}}>
                                            Arnau Ruiz
                                        </span><br />
                                        <strong style={{ fontSize: "0.9rem", color: "#eee4ddff" }}>Recordings Operations Engineer</strong><br />
                                        <span style={{ color: "#f7c6b5" }}>BMAT Music Innovators</span><br />

                                        <div style={{ marginTop: "8px" }}>
                                            <a href="https://github.com/arnaurf/" target="_blank" rel="noreferrer"><img style={{ margin: "10px" }} src="static/images/icons/github.svg" fetchpriority="high" alt="Github profile" width={"35"}  height={"35"}/></a>
                                            <a href="https://www.linkedin.com/in/arnauruizfernandez/" target="_blank" rel="noreferrer"><img style={{ margin: "10px" }} src="static/images/icons/linkedin.svg" fetchpriority="high" alt="Linkedin profile" width={"35"}  width="35" height={"35"} /></a>
                                            <a href="mailto: arnauruiz1998@gmail.com" target="_blank" rel="noreferrer"><img style={{ margin: "10px" }} src="static/images/icons/mail.svg" fetchpriority="high" alt="Personal Mail" width={"35"}  height={"35"}/></a>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-12 mb-5 col-lg-6" style={{ maxWidth: "800px", paddingTop: "0px", color: "hsla(27, 56%, 92%, 1.00)" }}>
                                    <h2 style={{ textAlign: "left", fontSize: "2rem", fontWeight: "700", marginBottom: "20px", color: "hsla(25, 50%, 100%, 0.95)" }}>
                                        <span className="text-center text-lg-start d-block">A Barcelona-based Engineer fusing technology with creativity</span>
                                    </h2>
                                    <hr style={{ borderColor: "#FFFF", margin: "30px auto", width: "95%" }} /> 
                                    <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                        I’m an <strong>Audiovisual Systems Engineer</strong> from Pompeu Fabra University with a strong interest in{" "}
                                        <span style={{ color: "#ff6f61" }}>programming</span>,{" "}
                                        <span style={{ color: "#ff6f61" }}>audio technology</span>, and{" "}
                                        <span style={{ color: "#ff6f61" }}>Linux environments</span>.
                                        When I’m not coding, I’m probably playing bass, composing, or producing music.
                                    </p>
                                    <p style={{ fontSize: "1rem", lineHeight: "1.6", marginTop: "25px" }}>
                                        My main goal is to build solutions that blend <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>technology</span> and <span style={{ color: "#f7c6b5", fontWeight: "bold" }}>art</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SKILLS */}
                    <div id="skills" className="text" style={{padding: "80px"}}>
                        <div className="container">
                            <center>
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/signal.svg" 
                                            fetchpriority="high" 
                                            alt="Signal and audio processing" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Audio and Signal Processing</span><br/>
                                        <span style={{fontSize:"15px"}}>Ffmpeg, Matlab, JUCE, ReaScript (Reaper), Pure Data</span>
                                    </div>
                                    <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/graphics.svg" 
                                            fetchpriority="high" 
                                            alt="Computer Graphics" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Systems</span><br/>
                                        <span style={{fontSize:"15px"}}>Linux, Puppet, Check MK, FTP, streaming protocols, broadcasting systems</span>
                                    </div>
                                    <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/code.svg" 
                                            fetchpriority="high" 
                                            alt="Programming Languages" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Programming Languages</span><br/>
                                        <span style={{fontSize:"15px"}}>Python, C++, Bash<br/>Also Matlab, C, Processing/Arduino</span>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/language.svg" 
                                            fetchpriority="high" 
                                            alt="Languages I Speak" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Languages</span><br/>
                                        <span style={{fontSize:"15px"}}>English, Spanish, Catalan</span>
                                    </div>
                                    <div className="col-lg-3 mb-5" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/fullstack.svg" 
                                            fetchpriority="high" 
                                            alt="Full-Stack libraries" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>Web Development</span><br/>
                                        <span style={{fontSize:"15px"}}>Django, React, Node.js, Bootstrap, CSS, HTML, Javascript, REST, SQL</span>
                                    </div>
                                    <div className="col-lg-3" style={{margin: "10px", minWidth: "250px"}}>
                                        <img 
                                            src="static/images/icons/tools.svg" 
                                            fetchpriority="high" 
                                            alt="Tools and softwares" 
                                            width={"60"} 
                                            height={"60"} 
                                            style={{marginBottom: "5px", filter: "drop-shadow(-1.2px 0.5px 1px rgba(0, 0, 0, 0.3))"}}
                                        /><br/>
                                        <span style={{fontSize:"20px", color:"rgba(24, 24, 24, 1)"}}>More!</span><br/>
                                        <span style={{fontSize:"15px"}}>Git, Photoshop, Premiere Pro, Pro Tools, Reaper, OpenGL and computer rendering, </span>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>

                    {/* WORK */}
                    <div id="experience" style={{backgroundColor: "hsl(26, 60%, 97%)", padding: "60px", fontFamily: 'Open Sans'}}>
                        <div className="container">
                            <div className="row justify-content-sm-center justify-content-center">
                                <div className="col-lg-4 d-flex">
                                    <div className="mx-auto text-center text-lg-start" style={{ width: "200px", margin: "10px" }}>
                                        <b style={{ fontSize: "40px", color: "rgba(64, 64, 64, 1)" }}>Work</b>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-8 col-8" style={{ minWidth: "300px"}}><br></br>{experience}</div>
                            </div>
                        </div>
                    </div>

                    {/* PROJECTS */}
                    <div id="projects" style={{padding: "60px", fontFamily: 'Open Sans'}}>
                        <div className="container">
                            <div className="row justify-content-sm-center justify-content-center">
                                <div className="col-lg-4 d-flex">
                                    <div className="mx-auto text-center text-lg-start" style={{ width: "200px", padding: "10px" }}>
                                        <b style={{ fontSize: "40px", color: "rgba(64, 64, 64, 1)" }}>Projects</b>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-8 col-8" style={{ minWidth: "300px"}}>
                                    <br></br>
                                    {category_text}
                                    {projects}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* CONTACT */}
                    <div id="contact" className="text" style={{padding: "20px", minWidth: "150px", backgroundColor: "hsl(26, 60%, 97%)"}}>
                        <div className="container">
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
                </main>
            </div>
        )
    }
}