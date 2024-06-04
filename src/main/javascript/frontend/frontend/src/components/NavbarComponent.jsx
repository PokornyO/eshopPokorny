import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import {useAuth} from "../context/UseAuth.jsx";
import Cookies from "js-cookie";
import {useEffect} from "react";





const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();


    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Eshop
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">Domů</Button>
                <Button color="inherit" component={RouterLink} to="/products">Produkty</Button>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/cart">Košík</Button>
                        <Button color="inherit" onClick={logout}>Odhlásit</Button>
                    </>
                ) : (
                    <Button color="inherit" component={RouterLink} to="/login">Přihlásit se</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
