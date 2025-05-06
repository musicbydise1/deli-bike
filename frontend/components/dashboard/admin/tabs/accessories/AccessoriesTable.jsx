"use client";

import React from "react";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function AccessoriesTable({ accessories, onEdit, onDelete }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Велосипед</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell align="center">Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accessories.map((accessory) => (
                        <TableRow key={accessory.id} hover>
                            <TableCell>{accessory.id}</TableCell>
                            <TableCell>
                                {accessory.bike
                                    ? `${accessory.bike.name} ${accessory.bike.model}`
                                    : Array.isArray(accessory.bikeId)
                                        ? accessory.bikeId.join(", ")
                                        : accessory.bikeId}
                            </TableCell>
                            <TableCell>{accessory.name}</TableCell>
                            <TableCell>{accessory.description}</TableCell>
                            <TableCell>{accessory.price}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <Tooltip title="Редактировать">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => onEdit(accessory)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => onDelete(accessory.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AccessoriesTable;
