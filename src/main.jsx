import { useState, useEffect, useRef } from 'react'
import { emailLiveValidation } from './functions/emailLiveValidation';
import { nameLiveValidation } from './functions/nameLiveValidation';
import { passwordLiveValidation } from './functions/passwordLiveValidation';
import { repasswordLiveValidation } from './functions/repasswordLiveValidation';
import Normal from './assets/normal.png'
import Hidden from './assets/hidden.png'

function flagCheck(successflags, buttonRef) {
  if (successflags.current.fl_uname === true && successflags.current.fl_email === true && successflags.current.fl_password === true && successflags.current.fl_repassword === true) {
    buttonRef.current.disabled = false;
    buttonRef.current.className = "submit-button btn-enabled";
  } else {
    buttonRef.current.disabled = true;
    buttonRef.current.className = "submit-button btn-disabled";
  }
}

function handleEyecon(event, inputBoxRef, otherEyeRef) {
  event.target.style.display = 'none';
  otherEyeRef.current.style.display = 'block';
  
  if(event.target.className === 'eyecon normal') {
    inputBoxRef.current.type = 'text';
  } else if(event.target.className === 'eyecon slash') {
    inputBoxRef.current.type = 'password';
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

  const normalEyeRef = useRef();
  const slashEyeRef = useRef();
  const normalEyeRef2 = useRef();
  const slashEyeRef2 = useRef();
  
  const formDiv = useRef();
  const mainDiv = useRef();

  const submitbutton = useRef();
  const successflags = useRef({ fl_uname: false, fl_email: false, fl_password: false, fl_repassword: false });

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

  useEffect(() => {
    // This format is used to get style which is in the external css, .style only gets inline style
    mainDiv.current.style.height = window.getComputedStyle(formDiv.current).getPropertyValue('height');
  }, [uname, email, password, repassword])

  useEffect(() => {
    mainDiv.current.style.height = window.getComputedStyle(formDiv.current).getPropertyValue('height');
  }, [])

  return (
    <>
      <div id='main-div' ref={mainDiv}>
        <div className="tpsquare" style={{ "--i": "1" }}></div>
        <div className="tpsquare" style={{ "--i": "2" }}></div>
        <div className="tpsquare" style={{ "--i": "3" }}></div>
        <div className="tpsquare" style={{ "--i": "4" }}></div>

        <div id="form-box" ref={formDiv}>
          <div id="heading" style={{ alignItems: "center" }}>
            <h2>Sign-Up</h2>
          </div>

          <div>
            <label htmlFor="namebox">Name</label>
            <input ref={unameBox} type="text" name="namebox" id="namebox" className="textinput" placeholder="Username" value={uname} onChange={(event) => setName(event.target.value)} />
          </div>
          <div ref={unameErr} className='errmessage-inactive' id='nameerror'></div>

          <div>
            <label htmlFor="emailbox">Email</label>
            <input ref={emailBox} type="text" name="emailbox" id="emailbox" className="textinput" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div ref={emailErr} className='errmessage-inactive' id='emailerror'></div>

          <div>
            <label htmlFor="passwordbox">Password</label>
            <div className='text-radio-pair'>
              <input ref={passwordBox} type="password" name="passwordbox" id="passwordbox" className="textinput" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <img ref={normalEyeRef} src={Normal} alt="unhide" className='eyecon normal' onClick={(event) => {handleEyecon(event, passwordBox, slashEyeRef)}}/>
              <img ref={slashEyeRef} src={Hidden} alt="hide" className='eyecon slash' style={{display: 'none'}} onClick={(event) => {handleEyecon(event, passwordBox, normalEyeRef)}}/>
            </div>
          </div>
          <div ref={passwordErr} className='errmessage-inactive' id='passworderror'></div>

          <div>
            <label htmlFor="repasswordbox">Re-enter Password</label>
            <div className='text-radio-pair'>
              <input ref={repasswordBox} type="password" name="repasswordbox" id="repasswordbox" value={repassword} className="textinput" onChange={(event) => setRePassword(event.target.value)} />
              <img ref={normalEyeRef2} src={Normal} alt="unhide" className='eyecon normal' onClick={(event) => {handleEyecon(event, repasswordBox, slashEyeRef2)}}/>
              <img ref={slashEyeRef2} src={Hidden} alt="hide" className='eyecon slash' style={{display: 'none'}} onClick={(event) => {handleEyecon(event, repasswordBox, normalEyeRef2)}}/>
            </div>
          </div>
          <div ref={repasswordErr} className='errmessage-inactive' id='repassworderror'></div>

          <div style={{ alignItems: "center" }}>
            <button ref={submitbutton} className='submit-button btn-disabled' onClick={() => { showValues(uname, email) }}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

// meaning of this regex ( /^[A-Z]+$/i ): match with a word which does not have a space before(^) or after($) it
// (i.e match with text that starts and ends with a letter only (case insensitive), space is not allowed this way)
//? I can even prohibit the entering of "numerispecial" characters, but disabling button functionality will be obsolete then, cause the user can only enter valid stuff in the fields