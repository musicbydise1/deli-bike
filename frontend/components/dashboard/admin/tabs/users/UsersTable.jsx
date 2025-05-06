"use client";

import React, { useState } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    TablePagination,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersTable({ users, onEdit, onDelete }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const paginatedUsers = users.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box>
            <TableContainer component={Paper} sx={{ maxHeight: 440, mb: 2 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'background.default' }}>
                            {[
                                'ID',
                                'Имя',
                                'Фамилия',
                                'Телефон',
                                'Email',
                                'Роль',
                                'Действия',
                            ].map((head) => (
                                <TableCell key={head}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow hover key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>
                                    {user.phoneNumber ? (
                                        user.phoneNumber
                                    ) : (
                                        <Typography color="text.secondary">—</Typography>
                                    )}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role ? user.role : <Typography color="text.secondary">—</Typography>}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Редактировать">
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(user)}
                                            color="primary"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(user.id)}
                                            color="error"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
}
