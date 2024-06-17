import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, InputLabel } from "@mui/material";
import { addProduct, updateProduct, getProduct } from "../services/ItemService.jsx";
import Cookies from "js-cookie";

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        inStockCount: "",
        description: "",
        image: null,
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const isAdmin = () => {
        const roles = Cookies.get('userRoles');
        return roles != null && roles.includes('ROLE_ADMIN');
    };
    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate, isAdmin]);
    useEffect(() => {
        if (id) {
            getProduct(id).then(response => {
                setProduct(response.data);
            }).catch(error => {
                console.error("Chyba při načítání produktu:", error);
            });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result.split(",")[1];
            setProduct({ ...product, image: base64Image });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                await updateProduct(id, product);
            } else {
                await addProduct(product);
            }
            navigate("/products");
        } catch (error) {
            console.error("Chyba při ukládání produktu:", error);
        }
    };

    return (
        <Box mt={4}>
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom>
                    {id ? "Upravit produkt" : "Přidat produkt"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Název"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Cena"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Počet na skladě"
                        name="inStockCount"
                        type="number"
                        value={product.inStockCount}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Popis"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <InputLabel style={{ marginTop: "16px" }}>Obrázek produktu</InputLabel>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginTop: "8px", marginBottom: "16px" }}
                    />
                    {product.image && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={`data:image/*;base64,${product.image}`}
                                alt="Product Preview"
                                style={{ maxWidth: "100%", maxHeight: "300px" }}
                            />
                        </Box>
                    )}
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" type="submit">
                            Uložit
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default ProductForm;
