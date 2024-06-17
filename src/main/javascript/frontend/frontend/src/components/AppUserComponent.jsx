import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import {deleteAppUser, getCount, listAppUsers} from "../services/AppUserService.jsx";
import { useNavigate } from "react-router-dom";


const AppUserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [count, setCount] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };
    function countProducts() {
        getCount()
            .then((response) => {
                setCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => prevSortOrder === "asc" ? "desc" : "asc");
    };
    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;
    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate, isAdmin]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listAppUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Chyba při získávání dat:", error);
            }
        };

        fetchData();
    }, []);

    const handleDetails = (id) => {
        navigate(`/profile/${id}`);
    };

    const handleDelete = async (userId) => {
        try {
            console.log(userId);
            await deleteAppUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const handleAddUser = () => {
        navigate('/register');
    };

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 50 },
        { field: 'username', headerName: 'Username', minWidth: 150 },
        { field: 'email', headerName: 'Email', minWidth: 200 },
        { field: 'role', headerName: 'Role', minWidth: 100 },
        { field: 'actions', headerName: '', align: 'center', minWidth: 100 }
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                Seznam uživatelů
            </Typography>
            {isAdmin() && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddUser}
                    sx={{ margin: 2 }}
                >
                    Přidat uživatele
                </Button>
            )}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role.name}</TableCell>
                                {isAdmin() && (
                                    <TableCell align="center">
                                        <Button onClick={() => handleDetails(user.id)} variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                                            Detaily
                                        </Button>
                                        <Button onClick={() => handleDelete(user.id)} variant="outlined" color="secondary">
                                            Odebrat
                                        </Button>
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

export default AppUserList;
