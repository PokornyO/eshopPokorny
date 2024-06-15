import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ProductComponent from "./ProductComponent.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
        calculateTotalPrice(storedCartItems);
    }, []);

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(totalPrice);
    };
    const navigate = useNavigate();
    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        calculateTotalPrice(updatedCartItems);
    };

    const handleChangeQuantity = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                if (newQuantity > item.stock) {
                    toast.error(`Na skladě je jen ${item.stock} kusů.`, {
                        duration: 3000,
                    });
                }
                let updatedQuantity = isNaN(newQuantity) ? item.quantity : Math.min(Number(newQuantity), Number(item.stock));
                if(updatedQuantity < 1) {
                    updatedQuantity = 1
                    toast.error(`Minimální počet kusů v košíku je 1`, {
                        duration: 3000,
                    });
                }
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        calculateTotalPrice(updatedCartItems);
    };

    const handleOrder = () => {
        navigate("/newOrder");
    };

    return (
        <div style={styles.cartContainer}>
            {cartItems.length === 0 ? (
                <Typography variant="h6">Košík je prázdný</Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {cartItems.map((item) => (
                            <Grid key={item.id}>
                                <ProductComponent {...item}  removeFromCart={() => handleRemoveItem(item.id)} handleQuantityChanged={(newQuantity) => handleChangeQuantity(item.id, newQuantity)} cart={true}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h6">Celková cena: {totalPrice} Kč</Typography>
                    <Button variant="contained" color="primary" onClick={handleOrder}>Objednat</Button>
                </>
            )}
        </div>
    );
};

const styles = {
    cartContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        maxWidth: 345,
        margin: "10px",
    },
};

export default CartComponent;
