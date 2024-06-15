import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
    const newPasswordInputRef = useRef();
    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        // add validation

        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBYU7KRGfUyscfv_KNOMt2utNvPZm1ClGU",
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecureToken: false,
                }),
                headers: {
                    "Content-Type": "application-json",
                },
            }
        ).then((res) => {
            // assumption: Always succeedds
            history.replace("/");
        });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={newPasswordInputRef}
                    minLength="7"
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
