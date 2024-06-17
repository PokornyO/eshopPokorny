import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../context/UseAuth.jsx";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProductComponent = (props) => {
    const { isAuthenticated } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const imageUrl = `data:image/png;base64,${props.image}`;

    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === props.id);

        if (quantity < 1) {
            toast.error("Množství musí být nejméně 1 kus.", {
                duration: 3000,
            });
            return;
        }

        let totalQuantity = quantity;

        if (existingProductIndex > -1) {
            totalQuantity += cart[existingProductIndex].quantity;
        }

        if (totalQuantity > props.inStockCount) {
            toast.error(`Na skladě je pouze ${props.inStockCount} kusů.`, {
                duration: 3000,
            });
            return;
        }

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity = totalQuantity;
        } else {
            cart.push({
                id: props.id,
                name: props.name,
                price: props.price,
                quantity: quantity,
                stock: props.inStockCount
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success(`${quantity} x ${props.name} bylo přidáno do košíku.`, {
            duration: 3000,
        });
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(isNaN(value) ? 1 : value);
    };

    return (
        <Card style={styles.card}>
            {!props.cart && imageUrl && (
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={props.name}
                    style={{ ...styles.media, objectFit: "contain" }}
                />
            )}
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Cena: {props.price} Kč
                </Typography>
                {props.cart ? (
                    <Typography variant="body1" color="text.primary">
                        Počet: {props.quantity} ks
                    </Typography>
                ) : (
                    <Typography variant="body1" color="text.primary">
                        Skladem: {props.inStockCount} ks
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={styles.description}>
                    {props.description}
                </Typography>
                {!props.cart && isAuthenticated && isAdmin() && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" size="small" onClick={props.onEdit}>
                            Upravit
                        </Button>
                        <Button variant="outlined" color="secondary" size="small" onClick={props.onDelete}>
                            Odebrat
                        </Button>
                    </div>
                )}
                {!props.cart && isAuthenticated && (
                    <div style={{ marginTop: '10px' }}>
                        <TextField
                            type="number"
                            label="Množství"
                            defaultValue="1"
                            onChange={handleQuantityChange}
                            InputProps={{ inputProps: { min: 1, max: props.inStockCount } }}
                            sx={{ ...styles.quantityInput, width: '80px' }}
                            size="small"
                        />
                        <Button variant="contained" color="primary" size="small" onClick={addToCart}>
                            Přidat do košíku
                        </Button>
                    </div>
                )}
                {props.cart && (
                    <div style={{ marginTop: '10px' }}>
                        <TextField
                            type="number"
                            label="Množství"
                            defaultValue="1"
                            onChange={(e) => props.handleQuantityChanged(parseInt(e.target.value))}
                            InputProps={{ inputProps: { min: 1, max: props.stock } }}
                            sx={{ ...styles.quantityInput, width: '80px' }}
                            size="small"
                        />
                        <Button variant="contained" color="secondary" size="small" onClick={props.removeFromCart}>
                            Odebrat z košíku
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
export default ProductComponent
const styles = {
    card: {
        maxWidth: 345,
        margin: "10px",
        minHeight: 200,
    },
    media: {
        height: 140,
        objectFit: "cover",
    },
    quantityInput: {
        marginRight: "10px",
    },
}