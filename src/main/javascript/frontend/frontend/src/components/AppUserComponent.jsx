import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { deleteAppUser, getCount, listAppUsers } from "../services/AppUserService.jsx";
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

    function loadData() {
        listAppUsers(page, size, sortBy, sortOrder).then((response) => {
            setUsers(response.data)
        }).catch(error => {
            console.log(error)
        });
    }

    function countUsers() {
        getCount()
            .then((response) => {
                setCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        countUsers();
        loadData();
    }, [page, size, sortBy, sortOrder]);

    useEffect(() => {
        loadData();
    }, []);

    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate, isAdmin]);

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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={2}>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Řadit podle</InputLabel>
                    <Select value={sortBy} onChange={handleSortByChange} label="Řadit podle">
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="username">Username</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
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

export default AppUserList;
