import { setSuccessFor, setErrorFor, removeErrorFor } from "./HelperFunctions";

export function passwordLiveValidation(password, passwordErr, passwordBox, successflags) {
    if (password.length > 0) {
        const result = /^((?=.*[a-z]))(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?<actual_matcher>[A-Za-z\d!?@#$%^&*_+=-]{8,})$/g.test(password);

        //here if I wanted to update the error message as only showing the missing criteria, I would have to use seperate checks with individual lookaheads of the above regex
        if (result === true) {
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
