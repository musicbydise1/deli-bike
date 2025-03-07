"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";

export default function OrdersTab() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Получаем данные об арендах с API при инициализации компонента
    useEffect(() => {
        async function fetchRentals() {
            try {
                const response = await fetch("http://localhost:4000/rentals/");
                if (!response.ok) {
                    throw new Error("Не удалось загрузить данные об арендах");
                }
                const data = await response.json();
                // Ожидаем, что данные приходят в виде { isSuccess, message, data: [...] }
                setRentals(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchRentals();
    }, []);

    if (loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
            </div>
        );
    if (error)
        return (
            <Alert severity="error" sx={{ textAlign: "center", margin: "20px" }}>
                Ошибка: {error}
            </Alert>
        );

    return (
        <Paper sx={{borderRadius: 2, boxShadow: "none" }}>
            <Typography variant="h4" gutterBottom>
                Управление заказами
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                Здесь отображаются все заказы. Вы можете изменять статус заказов и просматривать их
                детали.
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Таблица заказов">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Дата начала</TableCell>
                            <TableCell>Дата окончания</TableCell>
                            <TableCell>Общая стоимость</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Создано</TableCell>
                            <TableCell>Велосипед</TableCell>
                            <TableCell>Клиент</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentals.map((rental) => (
                            <TableRow key={rental.id} hover>
                                <TableCell>{rental.id}</TableCell>
                                <TableCell>
                                    {new Date(rental.startDate).toLocaleDateString("ru-RU")}
                                </TableCell>
                                <TableCell>
                                    {new Date(rental.endDate).toLocaleDateString("ru-RU")}
                                </TableCell>
                                <TableCell>{rental.totalPrice}</TableCell>
                                <TableCell>{rental.status}</TableCell>
                                <TableCell>
                                    {new Date(rental.createdAt).toLocaleString("ru-RU")}
                                </TableCell>
                                <TableCell>
                                    {rental.bike ? `${rental.bike.name} ${rental.bike.model}` : "Н/Д"}
                                </TableCell>
                                <TableCell>
                                    {rental.user
                                        ? `${rental.user.firstName} ${rental.user.lastName}`
                                        : "Н/Д"}
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={`/admin-orders/${rental.id}`} passHref legacyBehavior>
                                        <Button variant="contained" color="primary">
                                            Подробнее
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}