import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from "@mui/material";
import Cookies from "js-cookie";
import {getAppUser} from "../services/AppUserService.jsx";
import {addAddress, getAddress} from "../services/AddressService.jsx";
import {createOrder} from "../services/EOrderService.jsx";
import {useNavigate} from "react-router-dom";

const OrderFormComponent = ({ onSubmit }) => {
    const [userinfo, setUserinfo] = useState({
        city: '',
        street: '',
        houseNumber: '',
        zipcode: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = Cookies.get("userId");
                const response = await getAppUser(userId);
                setUserinfo({
                    city: response.data.city || '',
                    street: response.data.street || '',
                    houseNumber: response.data.houseNumber || '',
                    zipcode: response.data.zipcode || ''
                });

                if (response.data.address_id) {
                    const addressResponse = await getAddress(response.data.address_id);
                    setUserinfo(prevUserinfo => ({
                        ...prevUserinfo,
                        city: addressResponse.data.city || '',
                        street: addressResponse.data.street || '',
                        houseNumber: addressResponse.data.houseNumber || '',
                        zipcode: addressResponse.data.zipcode || ''
                    }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);
    const validate = () => {
        let tempErrors = {};
        tempErrors.city = userinfo.city ? "" : "City is required.";
        tempErrors.street = userinfo.street ? "" : "Street is required.";
        tempErrors.houseNumber = userinfo.houseNumber && userinfo.houseNumber > 0 ? "" : "House number must be a positive number.";
        tempErrors.zipcode = userinfo.zipcode && userinfo.zipcode > 0 ? "" : "Zipcode must be a positive number.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const address = {
                    city: userinfo.city,
                    street: userinfo.street,
                    houseNumber: userinfo.houseNumber,
                    zipcode: userinfo.zipcode
                };


                const addressResponse = await addAddress(address);
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const productInfo = cart.map(item => ({
                    itemId: item.id,
                    count: item.quantity
                }));
                const orderData = {
                    userId: Cookies.get('userId'),
                    addressId: addressResponse.data.id,
                    productInfo: productInfo
                };

                const response = await createOrder(orderData)
                const id = response.data.id
                navigate(`/order-details/${id}`);
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserinfo(prevUserinfo => ({
            ...prevUserinfo,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Adresa doručení</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Město"
                        name="city"
                        value={userinfo.city}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Ulice"
                        name="street"
                        value={userinfo.street}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Číslo popisné"
                        name="houseNumber"
                        value={userinfo.houseNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="PSČ"
                        name="zipcode"
                        value={userinfo.zipcode}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Odeslat objednávku</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default OrderFormComponent;
