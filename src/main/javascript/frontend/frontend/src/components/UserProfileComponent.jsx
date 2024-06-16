import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { getAppUser } from '../services/AppUserService.jsx';
import Cookies from "js-cookie";
import {getAddress} from "../services/AddressService.jsx";

const UserProfileComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address_id: ''
    });
    const [address, setAddress] = useState({
        city: '',
        street: '',
        houseNumber: '',
        zipcode: ''
    });

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await getAppUser(Cookies.get('userId'));
                    const addressResponse = await getAddress(response.data.address_id)
                    const userData = response.data;
                    const address = addressResponse.data;
                    setUser({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                        email: userData.email,
                        addressId: userData.address_id
                    });
                    setAddress({
                        city: address.city,
                        street: address.street,
                        houseNumber: address.houseNumber,
                        zipcode: address.zipcode
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleEditClick = () => {
        navigate(`/edit-user/${id}`);
    };

    const handleViewOrdersClick = () => {
        navigate(`/orders/${id}`)
    };

    return (
        <Paper sx={{ width: '100%', padding: 3, mt: 3 }}>
            <Typography variant="h6" component="div" gutterBottom>
                User Profile
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>First Name:</strong> {user.firstName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Last Name:</strong> {user.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Username:</strong> {user.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Email:</strong> {user.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>City:</strong> {address.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Street:</strong> {address.street}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>House Number:</strong> {address.houseNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Zipcode:</strong> {address.zipcode}
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditClick}
                        sx={{ mr: 2 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleViewOrdersClick}
                    >
                        View Orders
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserProfileComponent;
