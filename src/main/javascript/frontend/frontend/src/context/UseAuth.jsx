import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

// Vytvoření vlastního hooku pro autentizaci
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('authToken');
        setIsAuthenticated(!!token);
    }, [location.pathname]);

    const logout = () => {
        localStorage.clear();
        Cookies.remove('authToken');
        Cookies.remove('userId')
        Cookies.remove('userRoles')
        Cookies.remove()
        setIsAuthenticated(false);
        navigate("/login");
    };

    return { isAuthenticated, logout };
};
