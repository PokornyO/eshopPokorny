import Cookies from "js-cookie";
import {useEffect, useState} from "react";

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(!!Cookies.get("authToken"));

    useEffect(() => {
        const token = Cookies.get("authToken");
        setLoggedIn(!!token)
        console.log(loggedIn)
    }, [location.pathname]);

    const logout = () => {
        localStorage.clear()
        Cookies.remove("authToken");
        Cookies.remove
        setLoggedIn(false);
    };

    return {loggedIn, logout};
};

export default useAuth;