import {deleteProduct, getCount, listItems} from "../services/ItemService.jsx";
import {useEffect, useState} from "react";
import ProductComponent from "./ProductComponent.jsx";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
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
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [count, setCount] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    function loadData() {
        listItems(page, size, sortBy, sortOrder).then((response) => {
            setItems(response.data)
        }).catch(error => {
            console.log(error)
        });
    }
    function countProducts() {
        getCount()
            .then((response) => {
                setCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        countProducts();
        loadData();
    }, [page, size, sortBy, sortOrder]);
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
    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => prevSortOrder === "asc" ? "desc" : "asc");
    };
    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;
    const handleAddProduct = () => {
        // Navigate to the add product page
        navigate("/add-product");
    };
    const handleEditProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };
    const handleNextPage = () => {
        if (hasNextPage) {
            setPage(page + 1);
        }
    };
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Seznam produktů
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Řadit podle</InputLabel>
                    <Select value={sortBy} onChange={handleSortByChange} label="Řadit podle">
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="name">Název</MenuItem>
                        <MenuItem value="price">Cena</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Pořadí</InputLabel>
                    <Select value={sortOrder} onChange={handleSortOrderChange} label="Pořadí">
                        <MenuItem value="asc">Vzestupně</MenuItem>
                        <MenuItem value="desc">Sestupně</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={3}>
                {items.map((product) => (
                    <Grid key={product.id}>
                        <ProductComponent {...product}  onDelete={() => handleDelete(product.id)} onEdit={() => handleEditProduct(product.id)} cart={false}/>
                    </Grid>
                ))}
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handlePreviousPage} disabled={page === 0}>
                    Previous
                </Button>
                <Typography variant="body1">Page {page + 1} of {totalPages}</Typography>
                <Button variant="contained" onClick={handleNextPage} disabled={!hasNextPage}>
                    Next
                </Button>
            </Box>
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