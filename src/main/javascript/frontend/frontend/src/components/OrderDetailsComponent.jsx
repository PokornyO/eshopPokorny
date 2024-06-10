import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/EOrderService';
import { Paper, Typography, Box } from '@mui/material';
import TableComponent from './TableComponent';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [orderItemsList, setOrderItemsList] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrder(id);
                setOrder(response.data);
                console.log(response.data.address.houseNumber)
                const itemsList = response.data.orderItems.map(item => ({
                    name: item.item.name,
                    count: item.count
                }));
                setOrderItemsList(itemsList);
            } catch (error) {
                console.error('Chyba při načítání objednávky:', error);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    const columns = [
        { field: 'name', headerName: 'Item Name', minWidth: 150 },
        { field: 'count', headerName: 'Count', minWidth: 100, align: 'right' }
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, p: 3 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Order Details
            </Typography>
            {order && (
                <>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1"><strong>Order ID:</strong> {id}</Typography>
                        <Typography variant="body1"><strong>Creation Date:</strong> {new Date(order.creationDate).toLocaleString()}</Typography>
                        <Typography variant="body1"><strong>Total Price:</strong> ${order.price.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            User Information
                        </Typography>
                        <Typography variant="body1"><strong>User Name:</strong> {order.appUser.username}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {order.appUser.email}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Address Information
                        </Typography>
                        <Typography variant="body1"><strong>City:</strong> {order.address.city}</Typography>
                        <Typography variant="body1"><strong>Street:</strong> {order.address.street}</Typography>
                        <Typography variant="body1"><strong>House Number:</strong> {order.address.houseNumber}</Typography>
                        <Typography variant="body1"><strong>Zipcode:</strong> {order.address.zipcode}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="div" gutterBottom>
                            Order Items
                        </Typography>
                        <TableComponent columns={columns} data={orderItemsList} />
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default OrderDetails;
