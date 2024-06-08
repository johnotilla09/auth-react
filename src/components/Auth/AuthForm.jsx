import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    // This is a submit handler
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        console.log("The email is" + enteredEmail);
        console.log("The password is" + enteredPassword);

        setIsLoading(true);
        if (isLogin) {
        } else {
            // send a request to signup
            // this is just like a try catch
            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYU7KRGfUyscfv_KNOMt2utNvPZm1ClGU",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    }),
                    header: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    // ...
                    console.log(res);
                } else {
                    res.json().then((data) => {
                        // show and error modal
                        let errorMessage = "Authentication failed!";
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        alert(errorMessage);
                    });
                }
            });
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p>Loading...</p>}
                    {/* <button>{isLogin ? "Login" : "Create Account"}</button> */}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
