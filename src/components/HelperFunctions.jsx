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

export { setErrorFor, setSuccessFor, removeErrorFor }