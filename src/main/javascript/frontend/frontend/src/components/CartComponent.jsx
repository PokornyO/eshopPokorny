import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ProductComponent from "./ProductComponent.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Stavová proměnná pro celkovou cenu

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
        calculateTotalPrice(storedCartItems); // Při načítání komponenty spočítáme celkovou cenu
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
        calculateTotalPrice(updatedCartItems); // Po odebrání položky spočítáme novou celkovou cenu
    };

    const handleChangeQuantity = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                if (newQuantity > item.stock) {
                    toast.error(`Na skladě je jen ${item.stock} kusů.`, {
                        duration: 3000,
                    });
                }
                const updatedQuantity = isNaN(newQuantity) ? item.quantity : Math.min(Number(newQuantity), Number(item.stock));
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        calculateTotalPrice(updatedCartItems); // Po změně množství spočítáme novou celkovou cenu
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
                    <Typography variant="h6">Celková cena: {totalPrice} Kč</Typography> {/* Zobrazíme celkovou cenu */}
                    <Button variant="contained" color="primary" onClick={handleOrder}>Objednat</Button> {/* Tlačítko pro objednání */}
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
