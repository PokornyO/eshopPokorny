import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getOrder } from '../services/EOrderService';
import { Paper, Typography, Box } from '@mui/material';
import TableComponent from './TableComponent';
import Cookies from "js-cookie";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [orderItemsList, setOrderItemsList] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrder(id);
                setOrder(response.data);
                console.log(response.data.address.houseNumber)
                const itemsList = response.data.orderItems.map(item => ({
                    name: item.name,
                    count: item.count
                }));
                setOrderItemsList(itemsList);
            } catch (error) {
                navigate('/');
                console.error('Chyba při načítání objednávky:', error);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    const columns = [
        { field: 'name', headerName: 'Produkt', minWidth: 150 },
        { field: 'count', headerName: 'Počet', minWidth: 100, align: 'right' }
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, p: 3 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Detail objednávky
            </Typography>
            {order && (
                <>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1"><strong>ID objednávky:</strong> {id}</Typography>
                        <Typography variant="body1"><strong>Datum objednávky:</strong> {new Date(order.creationDate).toLocaleString()}</Typography>
                        <Typography variant="body1"><strong>Cena:</strong> {order.price.toFixed(2)} Kč</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Uživatel
                        </Typography>
                        <Typography variant="body1"><strong>Jméno:</strong> {order.appUser.firstName}</Typography>
                        <Typography variant="body1"><strong>Příjmení:</strong> {order.appUser.lastName}</Typography>
                        <Typography variant="body1"><strong>Username:</strong> {order.appUser.username}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {order.appUser.email}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Adresa
                        </Typography>
                        <Typography variant="body1"><strong>Město:</strong> {order.address.city}</Typography>
                        <Typography variant="body1"><strong>Ulice:</strong> {order.address.street}</Typography>
                        <Typography variant="body1"><strong>Číslo popisné:</strong> {order.address.houseNumber}</Typography>
                        <Typography variant="body1"><strong>PSČ:</strong> {order.address.zipcode}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="div" gutterBottom>
                            Produkty
                        </Typography>
                        <TableComponent columns={columns} data={orderItemsList} />
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default OrderDetails;
