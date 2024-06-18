import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { deleteOrder, getByUserId, getCount, getCountById, listOrders } from '../services/EOrderService.jsx';

const OrdersComponent = () => {
    const navigate = useNavigate();
    const { id: userIdFromParams } = useParams();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    function loadData() {
        if (userIdFromParams) {
            console.log(userIdFromParams)
            getByUserId(userIdFromParams, page, size, sortBy, sortOrder).then((response) => {
                setOrders(response.data)
            }).catch(error => {
                console.log(error)
            });
        } else {
            listOrders(page, size, sortBy, sortOrder).then((response) => {
                setOrders(response.data)
            }).catch(error => {
                console.log(error)
            });
        }
    }

    useEffect(() => {
        countOrders();
        loadData();
    }, [userIdFromParams, page, size, sortBy, sortOrder]);

    useEffect(() => {
        loadData();
    }, []);

    function countOrders() {
        if (userIdFromParams) {
            getCountById(userIdFromParams)
                .then((response) => {
                    setCount(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            getCount()
                .then((response) => {
                    setCount(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;
    const isAdmin = () => {
        const roles = Cookies.get('userRoles');
        return roles != null && roles.includes('ROLE_ADMIN');
    };

    const loggedInUserId = Cookies.get('userId');

    useEffect(() => {
        if (!isAdmin() && userIdFromParams !== loggedInUserId) {
            navigate('/');
        }
    }, [navigate, isAdmin, userIdFromParams, loggedInUserId]);

    const handleShowDetails = (orderId) => () => {
        navigate(`/order-details/${orderId}`);
    };

    const handleDelete = (orderId) => async () => {
        try {
            await deleteOrder(orderId)
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const formatCreationDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('cs-CZ', options);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'creationDate', headerName: 'Datum objednávky' },
        { field: 'price', headerName: 'Cena' },
        { field: 'appUser.username', headerName: 'Username' }
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                Objednávky
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={2}>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Řadit podle</InputLabel>
                    <Select value={sortBy} onChange={handleSortByChange} label="Řadit podle">
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="creationDate">Datum objednávky</MenuItem>
                        <MenuItem value="price">Cena</MenuItem>
                        <MenuItem value="appUser.username">Username</MenuItem>
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
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align="left"
                                    style={{ minWidth: column.minWidth || 100 }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.field} align="left">
                                        {column.field === 'appUser.username'
                                            ? row.appUser.username
                                            : column.field === 'creationDate'
                                                ? formatCreationDate(row.creationDate)
                                                : row[column.field]}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleShowDetails(row.id)}
                                    >
                                        Zobrazit detaily
                                    </Button>
                                    {isAdmin() && (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={handleDelete(row.id)}
                                            sx={{ ml: 1 }}
                                        >
                                            Odebrat
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={3} display="flex" justifyContent="space-between" px={2}>
                <Button variant="contained" onClick={handlePreviousPage} disabled={page === 0}>
                    Previous
                </Button>
                <Typography variant="body1">Page {page + 1} of {totalPages}</Typography>
                <Button variant="contained" onClick={handleNextPage} disabled={!hasNextPage}>
                    Next
                </Button>
            </Box>
        </Paper>
    );
};

export default OrdersComponent;
