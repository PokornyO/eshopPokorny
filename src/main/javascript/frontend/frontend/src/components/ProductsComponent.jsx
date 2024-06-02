import {deleteProduct, listItems} from "../services/ItemService.jsx";
import {useEffect, useState} from "react";
import ProductComponent from "./ProductComponent.jsx";
import {Container, Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };
    function loadData() {
        listItems().then((response) => {
            setItems(response.data)
        }).catch(error => {
            console.log(error)
        });
    }
    useEffect(() => {
        loadData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            await loadData();
        } catch (error) {
            console.error("Chyba při odstraňování položky:", error);
        }
    };
    const handleAddProduct = () => {
        // Navigate to the add product page
        navigate("/add-product");
    };
    const handleEditProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam produktů
            </Typography>
            <Grid container spacing={3}>
                {items.map((product) => (
                    <Grid key={product.id}>
                        <ProductComponent {...product}  onDelete={() => handleDelete(product.id)} onEdit={() => handleEditProduct(product.id)}/>
                    </Grid>
                ))}
            </Grid>
            {isAdmin() && (
                <Box mt={3} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Přidat produkt
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ItemsList;