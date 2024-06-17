import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { createAppUser, getAppUser, updateAppUser } from '../services/AppUserService.jsx';
import bcrypt from 'bcryptjs';
import Cookies from "js-cookie";
import { getRoles } from "../services/RoleService.jsx";
import {addAddressUser, getAddress} from "../services/AddressService.jsx";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedInUserId = Cookies.get('userId');
    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: 2
    });
    const [address, setAddress] = useState({
        city: '',
        street: '',
        houseNumber: '',
        zipcode: ''
    });
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        if (!isAdmin() && id !== loggedInUserId) {
            navigate('/');
        }
    }, [navigate, isAdmin, id, loggedInUserId]);
    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await getAppUser(id);
                    const addressResponse = await getAddress(response.data.address_id)
                    const address = addressResponse.data;
                    const userData = response.data;

                    setUser({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                        email: userData.email,
                        password: '',
                        confirmPassword: '',
                        roleId: userData.role.id
                    });
                    setAddress({
                        city: address.city,
                        street: address.street,
                        houseNumber: address.houseNumber,
                        zipcode: address.zipcode
                    });
                } catch (error) {
                    console.error('Chyba při načítání uživatele:', error);
                }
            };
            fetchUser();
        }
    }, [id]);

    useEffect(() => {
        if (isAdmin()) {
            const fetchRoles = async () => {
                try {
                    const response = await getRoles();
                    setRoles(response.data);
                } catch (error) {
                    console.error('Chyba při načítání rolí:', error);
                }
            };
            fetchRoles();
        }
    }, []);

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
        try {
            if (id) {
                const updatedUser = await updateAppUser(id, user);
                await addAddressUser(updatedUser.data.id, address);
            } else {
                const createdUser = await createAppUser(user);
                await addAddressUser(createdUser.data.id, address);
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
                                type="email"
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
                                inputProps={{ min: 1 }}
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
                                inputProps={{ min: 1 }}
                                onChange={handleAddressChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        {isAdmin() && (
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        name="roleId"
                                        value={user.roleId}
                                        onChange={handleUserChange}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.id} value={role.id}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
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
