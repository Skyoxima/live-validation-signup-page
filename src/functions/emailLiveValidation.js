import { setSuccessFor, setErrorFor, removeErrorFor } from './HelperFunctions';

export function emailLiveValidation(email, emailErr, emailBox, successflags) {
    if (email.length > 0) {
        const result = /^(?<username>[a-zA-Z]\w*(\.\w+)?)@(?<domain>\w+)\.((com|net|edu|org|gov)|co\.(in|ca|au|uk|us))$/g.test(email);

        if (result === true) {
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
