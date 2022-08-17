import { useState, useEffect, useRef } from 'react'
import { emailLiveValidation } from './functions/emailLiveValidation';
import { nameLiveValidation } from './functions/nameLiveValidation';
import { passwordLiveValidation } from './functions/passwordLiveValidation';
import { repasswordLiveValidation } from './functions/repasswordLiveValidation';

function flagCheck(successflags, buttonRef) {
  if (successflags.current.fl_uname === true && successflags.current.fl_email === true && successflags.current.fl_password === true && successflags.current.fl_repassword === true) {
    buttonRef.current.disabled = false;
    buttonRef.current.className = "submit-button btn-enabled";
  } else {
    buttonRef.current.disabled = true;
    buttonRef.current.className = "submit-button btn-disabled";
  }
}

function handleEyecon(event, passwordBox, otherEyeRef) {
  if(event.target.className.baseVal === 'eyecon normal'){
    passwordBox.current.type = 'text';
    event.target.style.display = 'none';
    otherEyeRef.current.style.display = 'inline-block';
  } else if(event.target.className.baseVal === 'eyecon slash') {
    passwordBox.current.type = 'password';
    event.target.style.display = 'none';
    otherEyeRef.current.style.display = 'inline-block';
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
              <svg stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 16 16" 
                    height="25" 
                    width="25"
                    className='eyecon normal'
                    ref={normalEyeRef}
                    onClick={(event) => {handleEyecon(event, passwordBox, slashEyeRef)}} 
                    xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="25" 
                width="25"
                className='eyecon slash'
                ref={slashEyeRef} 
                onClick={(event) => {handleEyecon(event, passwordBox, normalEyeRef)}} 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
              </svg>
            </div>
          </div>
          <div ref={passwordErr} className='errmessage-inactive' id='passworderror'></div>

          <div>
            <label htmlFor="repasswordbox">Re-enter Password</label>
            <div className='text-radio-pair'>
              <input ref={repasswordBox} type="password" name="repasswordbox" id="repasswordbox" value={repassword} className="textinput" onChange={(event) => setRePassword(event.target.value)} />
              <svg stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 16 16" 
                    height="25" 
                    width="25"
                    className='eyecon normal'
                    ref={normalEyeRef2}
                    onClick={(event) => {handleEyecon(event, repasswordBox, slashEyeRef2)}} 
                    xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="25" 
                width="25"
                className='eyecon slash'
                ref={slashEyeRef2} 
                onClick={(event) => {handleEyecon(event, repasswordBox, normalEyeRef2)}} 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
              </svg>
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