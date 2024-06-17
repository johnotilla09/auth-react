import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loggedOutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const loggInHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem("token", token);

        const remainingTime = calculateRemainingTime(expirationTime);

        setTimeout(loggInHandler, remainingTime);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loggInHandler,
        logout: loggedOutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
