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

function nameLiveValidation(uname, unameErr, unameBox, successflags) {
    if(uname.length > 0) {
        const strlen = uname.length;
        
        if(strlen < 3 || strlen > 25) {
            setErrorFor(unameErr, "Name must be between 3 to 25 characters!", unameBox);
            successflags.current.fl_uname = false;
        } else {
            setSuccessFor(unameErr, unameBox);
        
            if(/^[a-zA-Z]+$/g.test(uname) === false) {
                setErrorFor(unameErr, "Only alphabets allowed", unameBox);
                successflags.current.fl_uname = false;
            } else {
                setSuccessFor(unameErr, unameBox);
                successflags.current.fl_uname = true;
            }
        }
        
    } else {
        removeErrorFor(unameErr, unameBox);
        successflags.current.fl_uname = false;
    }
}

function emailLiveValidation(email, emailErr, emailBox, successflags) {
    if(email.length > 0) {
        const result = /^(?<username>[a-zA-Z]\w*(\.\w+)?)@(?<domain>\w+)\.((com|net|edu|org|gov)|co\.(in|ca|au|uk|us))$/g.test(email);
        
        if(result === true) {
            setSuccessFor(emailErr, emailBox);
            successflags.current.fl_email = true;
        } else {
            setErrorFor(emailErr, "Invalid Email Format", emailBox);
            successflags.current.fl_email = false;
        }
    } else {
        removeErrorFor(emailErr, emailBox);
        successflags.current.fl_email = false;
    }
}

function passwordLiveValidation(password, passwordErr, passwordBox, successflags) {
    if(password.length > 0) {
        const result = /^((?=.*[a-z]))(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?<actual_matcher>[A-Za-z\d!?@#$%^&*_+=-]{8,})$/g.test(password);
        
        //here if I wanted to update the error message as only showing the missing criteria, I would have to use seperate checks with individual lookaheads of the above regex
        if(result === true) {
            setSuccessFor(passwordErr, passwordBox);
            successflags.current.fl_password = true;
        } else {
            setErrorFor(passwordErr, "Min. Password length: 8 characters\nMust contain:\n1 uppercase character,\n1 number and \n1 special character", passwordBox);
            successflags.current.fl_password = false;
        }
    } else {
        removeErrorFor(passwordErr, passwordBox);
        successflags.current.fl_password = false;
    }
}

function repasswordLiveValidation(repassword, password, repasswordErr, repasswordBox, successflags) {
    if(repassword.length > 0) {
        if(repassword === password) {
            setSuccessFor(repasswordErr, repasswordBox);
            successflags.current.fl_repassword = true;
        } else {
            setErrorFor(repasswordErr, "Password Mismatch...", repasswordBox);
            successflags.current.fl_repassword = false;
        }
    } else {
        removeErrorFor(repasswordErr, repasswordBox);
        successflags.current.fl_repassword = false;
    }
}

function flagCheck(successflags, buttonRef) {
    if(successflags.current.fl_uname === true && successflags.current.fl_email === true && successflags.current.fl_password === true && successflags.current.fl_repassword === true) {
        buttonRef.current.disabled = false;
        buttonRef.current.className = "submit-button btn-enabled";
    } else {
        buttonRef.current.disabled = true;
        buttonRef.current.className = "submit-button btn-disabled";
    }
}

function showValues(uname, email, password) {
    console.log(`Username: ${uname}\nEmail: ${email}\nPassword: ${password}`);
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
    
    const submitbutton = useRef();
    const successflags = useRef({fl_uname: false, fl_email: false, fl_password: false, fl_repassword: false});

    // called after every re-render caused by the changing of variable passed in the array (and every re-render if no variables are passed)
    useEffect(() => {
        nameLiveValidation(uname, unameErr, unameBox, successflags);
        flagCheck(successflags, submitbutton);
    }, [uname]);
    
    useEffect(() => {
        emailLiveValidation(email, emailErr, emailBox, successflags);
        flagCheck(successflags, submitbutton);
    }, [email]);
    
    useEffect(() => {
        passwordLiveValidation(password, passwordErr, passwordBox, successflags);
        flagCheck(successflags, submitbutton);
    }, [password]);
    
    useEffect(() => {
        repasswordLiveValidation(repassword, password, repasswordErr, repasswordBox, successflags);
        flagCheck(successflags, submitbutton);
    }, [password, repassword]);

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
                    <input ref={ repasswordBox } type="password" name="repasswordbox" id="repasswordbox" value={ repassword } className="textinput" onChange={(event) => setRePassword(event.target.value)} />
                </div>
                <div ref={ repasswordErr } className='errmessage-inactive' id='repassworderror'></div>

                <div className='buttoninput' style={{alignItems: "center"}}>
                    <input ref={ submitbutton } type="button" value="Submit" className='submit-button btn-disabled' onClick={() => {showValues(uname, email, password)}}/> 
                </div>
            </div>
            {/* onClick={ showFields(unameBox, emailBox, passwordBox, repasswordBox) } */}
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