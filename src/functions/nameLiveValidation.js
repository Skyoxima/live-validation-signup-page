import {setErrorFor, setSuccessFor, removeErrorFor} from './HelperFunctions'

export function nameLiveValidation(uname, unameErr, unameBox, successflags) {
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