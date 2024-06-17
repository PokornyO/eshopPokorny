import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { deleteOrder, getByUserId, listOrders } from '../services/EOrderService.jsx';

const OrdersComponent = () => {
    const navigate = useNavigate();
    const { id: userIdFromParams } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                let response;
                if (userIdFromParams) {
                    response = await getByUserId(userIdFromParams);
                } else {
                    response = await listOrders();
                }
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserOrders();
    }, [userIdFromParams]);

    const isAdmin = () => {
        const roles = Cookies.get('userRoles');
        return roles != null && roles.includes('ROLE_ADMIN');
    };

    const loggedInUserId = Cookies.get('userId');

    useEffect(() => {
            if (!isAdmin() && userIdFromParams !== loggedInUserId) {
                navigate('/'); // Redirect to home or another appropriate route
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
        </Paper>
    );
};

export default OrdersComponent;
