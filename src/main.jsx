import { useState, useEffect, useRef } from 'react'
import { emailLiveValidation } from './components/emailLiveValidation.jsx';
import { nameLiveValidation } from './components/nameLiveValidation.jsx';
import { passwordLiveValidation } from './components/passwordLiveValidation';
import { repasswordLiveValidation } from './components/repasswordLiveValidation';

function flagCheck(successflags, buttonRef) {
    if(successflags.current.fl_uname === true && successflags.current.fl_email === true && successflags.current.fl_password === true && successflags.current.fl_repassword === true) {
        buttonRef.current.disabled = false;
        buttonRef.current.className = "submit-button btn-enabled";
    } else {
        buttonRef.current.disabled = true;
        buttonRef.current.className = "submit-button btn-disabled";
    }
}

function showValues(uname, email) {
    alert(`Username: ${uname}\nEmail: ${email}`);
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
                    <input ref={ submitbutton } type="button" value="Submit" className='submit-button btn-disabled' onClick={() => {showValues(uname, email)}}/> 
                </div>
            </div>

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