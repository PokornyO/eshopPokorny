import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {createAppUser, getAppUser, updateAppUser} from '../services/AppUserService.jsx';

const UserForm = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [address, setAddress] = useState({
        city: '',
        street: '',
        houseNumber: '',
        zipcode: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await getAppUser(id);
                    const userData = response.data;
                    setUser({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                        email: userData.email,
                        password: '',
                        confirmPassword: ''
                    });
                    setAddress({
                        city: userData.city,
                        street: userData.street,
                        houseNumber: userData.houseNumber,
                        zipcode: userData.zipcode
                    });
                } catch (error) {
                    console.error('Chyba při načítání uživatele:', error);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        user.password = await bcrypt.hash(user.password, 10);
        try {
            const fullUserData = { ...user, ...address };
            if (id) {
                await updateAppUser(id, fullUserData);
            } else {
                await createAppUser(fullUserData);
            }
        } catch (error) {
            console.error('Chyba při ukládání uživatele:', error);
        }
    };

    return (
        <Paper sx={{ width: '100%', padding: 3, mt: 3 }}>
            <Typography variant="h6" component="div" gutterBottom>
                {id ? 'Edit User' : 'Create User'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Username"
                                name="username"
                                value={user.username}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={user.confirmPassword}
                                onChange={handleUserChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Street"
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="House Number"
                                name="houseNumber"
                                type="number"
                                value={address.houseNumber}
                                onChange={handleAddressChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Zipcode"
                                name="zipcode"
                                type="number"
                                value={address.zipcode}
                                onChange={handleAddressChange}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                        {id ? 'Update User' : 'Create User'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UserForm;
