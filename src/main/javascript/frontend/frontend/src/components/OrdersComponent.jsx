import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getByUserId, listOrders } from '../services/EOrderService.jsx';

const OrdersComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                let response;
                if (id) {
                    response = await getByUserId(id);
                } else {
                    response = await listOrders();
                }
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserOrders();
    }, [id]);

    const isAdmin = () => {
        const roles = Cookies.get('userRoles');
        return roles != null && roles.includes('ROLE_ADMIN');
    };

    const handleShowDetails = (orderId) => () => {
        navigate(`/order-details/${orderId}`);
    };

    const handleDelete = (orderId) => async () => {
        try {
            console.log(`Deleting order with id ${orderId}`);
            // await deleteOrder(orderId); // Implement actual API call for deletion
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'creationDate', headerName: 'Creation Date' },
        { field: 'price', headerName: 'Price' },
        { field: 'appUser.username', headerName: 'Username' }
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                Orders
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
                            {isAdmin() && <TableCell align="center">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.field} align="left">
                                        {column.field === 'appUser.username' ? row.appUser.username : row[column.field]}
                                    </TableCell>
                                ))}
                                {isAdmin() && (
                                    <TableCell align="center">
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleShowDetails(row.id)}
                                            >
                                                Show Details
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={handleDelete(row.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OrdersComponent;
