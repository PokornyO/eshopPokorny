import {deleteProduct, listItems} from "../services/ItemService.jsx";
import {useEffect, useState} from "react";
import ProductComponent from "./ProductComponent.jsx";
import {Container, Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

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
    return (
        <Container>
            <Grid container spacing={2}>
                {items.map((product) => (
                    <Grid key={product.id}>
                        <ProductComponent {...product} onDelete={() => handleDelete(product.id)} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ItemsList;