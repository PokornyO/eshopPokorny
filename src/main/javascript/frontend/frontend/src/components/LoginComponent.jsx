import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {getLogin} from "../services/LoginService.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/UseAuth.jsx";





const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Indikátor načítání
    const [error, setError] = useState(null); // Zpráva o chybě
    const navigate = useNavigate();
    const { loggedIn, login } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const loginRequest = {username, password};
            const response = await getLogin(loginRequest)
            const token = response.data.token;
            if(token) {
                const decodedToken = jwtDecode(token)
                Cookies.set('authToken', token, { expires: 7 });
                Cookies.set("userId", decodedToken.sub, {expires: 7});
                Cookies.set("userRoles", JSON.stringify(decodedToken.au), {expires: 7});
                navigate("/products");
            }
        } catch (err) {
            alert("Wrong username or password");
        } finally {
            setLoading(false);
            setUsername('');
            setPassword('');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Centrování
            }}
        >
            <Paper
                sx={{
                    padding: 4,
                    maxWidth: 400,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Přihlášení
                </Typography>
                <TextField
                    label="Uživatelské jméno"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Heslo"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Přihlásit se
                    </Button>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default LoginComponent;
