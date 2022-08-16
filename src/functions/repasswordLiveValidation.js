import {setErrorFor, setSuccessFor, removeErrorFor} from './HelperFunctions'

export function repasswordLiveValidation(repassword, password, repasswordErr, repasswordBox, successflags) {
    if (repassword.length > 0) {
        if (repassword === password) {
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
