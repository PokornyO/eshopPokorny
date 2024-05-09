import {listItems} from "../services/ItemService.jsx";
import {useEffect, useState} from "react";
import ProductComponent from "./ProductComponent.jsx";
import {Container, Grid} from "@mui/material";

const ItemsList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listItems();
                setItems(response.data);
            } catch (error) {
                console.error("Chyba při získávání dat:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                {items.map((product) => (
                    <Grid key={product.id}>
                        <ProductComponent {...product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ItemsList;