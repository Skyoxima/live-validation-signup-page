import { useState, useEffect, useRef } from 'react'

function setErrorFor(ErrRef, errmessage, inputBoxRef) {
    ErrRef.current.innerText = errmessage;
    ErrRef.current.className = "errmessage-active";
    inputBoxRef.current.className = "textinput textinput-error";
}

function setSuccessFor(ErrRef, inputBoxRef) {
    ErrRef.current.innerText = "";
    ErrRef.current.className = "errmessage-inactive";
    inputBoxRef.current.className = "textinput textinput-success";
}

function removeErrorFor(ErrRef, inputBoxRef) {
    ErrRef.current.innerText = "";
    ErrRef.current.className = "errmessage-inactive";
    inputBoxRef.current.className = "textinput";  
}

function nameLiveValidation(uname, unameErr, unameBox) {
    if((uname.length < 3 && uname.length > 0) || (uname.length > 25)) {
        setErrorFor(unameErr, "Name must be between 3 to 25 characters!", unameBox);
    }  else if(uname.length >= 3 && uname.length <= 25) {
        setSuccessFor(unameErr, unameBox);
        
        if(uname.length > 0 && /^[A-Z]+$/i.test(uname) === false) {
            setErrorFor(unameErr, "Numbers, special characters and space not allowed!", unameBox);
        } else {
            setSuccessFor(unameErr, unameBox);
        }
    }
    else if(uname.length === 0) {
        removeErrorFor(unameErr, unameBox);
    }   
}

function emailLiveValidation(email, emailErr, emailBox) {
    if(email.length > 0) {
        const result = /^(?<username>[a-zA-Z]\w*(\.\w+)?)@(?<domain>\w+)\.((com|net|edu|org|gov)|co\.(in|ca|au|uk|us))$/g.test(email);
        
        if(result === true) {
            setSuccessFor(emailErr, emailBox);
        } else {
            setErrorFor(emailErr, "Invalid Email Format", emailBox);
        }
    } else {
        removeErrorFor(emailErr, emailBox);
    }
}

function passwordLiveValidation(password, passwordErr, passwordBox) {
    if(password.length > 0) {
        const result = /^((?=.*[a-z]))(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?<actual_matcher>[A-Za-z\d!?@#$%^&*_+=-]{6,})$/g.test(password);

        if(result === true) {
            setSuccessFor(passwordErr, passwordBox);
        } else {
            setErrorFor(passwordErr, "Password must be atleast 8 characters and have atleast 1 uppercase letter, 1 number and 1 special character!", passwordBox);
        }
    } else {
        removeErrorFor(passwordErr, passwordBox);
    }
}

function repasswordLiveValidation(repassword, password, repasswordErr, repasswordBox) {
    if(repassword.length > 0) {
        if(repassword === password) {
            setSuccessFor(repasswordErr, repasswordBox);
        } else {
            setErrorFor(repasswordErr, "Password Mismatch...", repasswordBox);
        }
    } else {
        removeErrorFor(repasswordErr, repasswordBox);
    }
}

function SignUpPage() {
    console.log("Component Rendered");
    const [uname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const unameBox = useRef();
    const unameErr = useRef();
    const emailBox = useRef();
    const emailErr = useRef();
    const passwordBox = useRef();
    const passwordErr = useRef();
    const repasswordBox = useRef();
    const repasswordErr = useRef();

    // called after every re-render caused by the changing of variable passed in the array (and every re-render if no variables are passed)
    useEffect(() => {
        nameLiveValidation(uname, unameErr, unameBox);
    }, [uname]);

    useEffect(() => {
        emailLiveValidation(email, emailErr, emailBox);
    }, [email]);

    useEffect(() => {
        passwordLiveValidation(password, passwordErr, passwordBox);
    }, [password]);

    useEffect(() => {
        repasswordLiveValidation(repassword, password, repasswordErr, repasswordBox);
    }, [repassword]);

    return (
        <section>
            <div id="main-box">
                <div id="heading" style={{alignItems: "center"}}>
                    <h2>Sign-Up</h2>
                </div>

                <div>
                    <label htmlFor="namebox">Name</label>
                    <input ref={ unameBox } type="text" name="namebox" id="namebox" className="textinput"  placeholder="Username" value={ uname } onChange={(event) => setName(event.target.value)}/>
                </div>
                <div ref={ unameErr } className='errmessage-inactive' id='nameerror'></div>

                <div>
                    <label htmlFor="emailbox">Email</label>
                    <input ref={ emailBox } type="text" name="emailbox" id="emailbox" className="textinput" placeholder="Email" value={ email } onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div ref={ emailErr } className='errmessage-inactive' id='emailerror'></div>
                
                <div>
                    <label htmlFor="passwordbox">Password</label>
                    <input ref={ passwordBox } type="password" name="passwordbox" id="passwordbox" className="textinput" placeholder="Password" value={ password } onChange = {(event) => setPassword(event.target.value)}/>
                </div>
                <div ref={ passwordErr } className='errmessage-inactive' id='passworderror'></div>
                
                <div>
                    <label htmlFor="repasswordbox">Re-enter Password</label>
                    <input type="password" name="repasswordbox" id="repasswordbox" value={ repassword } className="textinput" onChange={(event) => setRePassword(event.target.value)} />
                </div>

                <div className='buttoninput' style={{alignItems: "center"}}>
                {/* Add a grayed-out submit button, only activating when everything is valid */}
                <input type="button" value="Submit" className='disabled-button'/> 
                </div>
            </div>
            {/* by default it should be deactivated, activating only when all fields are set as success (thinking of array based implementation) */}
            <div className="bgsquares">    
                <div className="tpsquare" style={{"--i": "1"}}></div>
                <div className="tpsquare" style={{"--i": "2"}}></div>
                <div className="tpsquare" style={{"--i": "3"}}></div>
                <div className="tpsquare" style={{"--i": "4"}}></div>
            </div>
        </section>
    );
}

export default SignUpPage;

// meaning of this regex ( /^[A-Z]+$/i ): match with a word which does not have a space before(^) or after($) it 
// (i.e match with text that starts and ends with a letter only (case insensitive), space is not allowed this way)
//? I can even prohibit the entering of "numerispecial" characters, but disabling button functionality will be obsolete then, cause the user can only enter valid stuff in the fields