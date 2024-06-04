import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {useAuth} from "../context/UseAuth.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {fixPropTypesSort} from "eslint-plugin-react/lib/util/propTypesSort.js";
import Cookies from "js-cookie";
import {AxiosHeaders as Buffer} from "axios";
import {useState} from "react";

const ProductComponent = (props) => {
    const { isAuthenticated, logout } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const imageUrl = `data:image/png;base64,${props.image}`;
    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === props.id);
        let totalQuantity = quantity;
        if (existingProductIndex > -1) {
            totalQuantity += cart[existingProductIndex].quantity;
        }
        if (totalQuantity > props.inStockCount) {
            alert(`Na skladě je pouze ${props.inStockCount} kusů.`);
            return;
        }
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
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
        alert(`${quantity} x ${props.name} has been added to the cart.`);
    };
    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
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
                    <div style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" size="small" sx={styles.adminButton} onClick={props.onEdit}>
                            Upravit
                        </Button>
                        <Button variant="outlined" color="secondary" size="small" sx={styles.adminButton} onClick={props.onDelete}>
                            Odebrat
                        </Button>
                    </div>
                )}
                {!props.cart && isAuthenticated && (
                    <div>
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
                    <div>
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
    description: {
        marginBottom: '10px',
    },
};

export default ProductComponent;
