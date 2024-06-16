import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TableComponent = ({ columns, data, title, isAdmin }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                {title}
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth || 100 }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                            {isAdmin && <TableCell align="center">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                {columns.map((column) => (
                                    <TableCell key={column.field} align={column.align || 'left'}>
                                        {row[column.field]}
                                    </TableCell>
                                ))}
                                {isAdmin && (
                                    <TableCell align="center">
                                        Actions Here (if any)
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

export default TableComponent;