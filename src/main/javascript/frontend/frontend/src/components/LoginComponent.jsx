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
import bcrypt from 'bcryptjs';





const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loggedIn, login } = useAuth();
    const navigate = useNavigate();
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
                navigate("/items");
            }
        } catch (err) {
            alert("Wrong username or password");
        } finally {
            setLoading(false);
            setUsername('');
            setPassword('');
        }
    };
    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
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
                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                    Ještě nemáte účet?
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={handleRegisterRedirect}
                    sx={{
                        fontWeight: 'bold',
                        padding: '10px 0'
                    }}
                >
                    Registrovat
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginComponent;
