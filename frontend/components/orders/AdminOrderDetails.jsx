"use client";
import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Snackbar,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function AdminOrderDetails({ orderId }) {
    const [order, setOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const router = useRouter();

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await fetch(`https://api.deli-bike.kz/rentals/${orderId}`);
                if (!response.ok) {
                    throw new Error("Не удалось загрузить детали заказа");
                }
                const data = await response.json();
                // Ожидаем, что данные приходят в виде { isSuccess, message, data: { ... } }
                setOrder(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    // Устанавливаем текущий статус после загрузки заказа
    useEffect(() => {
        if (order) {
            setNewStatus(order.status);
        }
    }, [order]);

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleStatusUpdate = async () => {
        try {
            const response = await fetch(`https://api.deli-bike.kz/rentals/${order.id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error("Ошибка обновления статуса заказа");
            }
            const updatedData = await response.json();
            setOrder(updatedData.data);
            setSnackbar({ open: true, message: "Статус успешно обновлён", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: error.message, severity: "error" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2, textAlign: "center" }}>
                Ошибка: {error}
            </Alert>
        );
    }

    if (!order) {
        return (
            <Typography variant="body1" sx={{ p: 2 }}>
                Заказ не найден.
            </Typography>
        );
    }

    return (
        <Paper sx={{ p: 3, m: 15 }} style={{ marginTop: "7rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => router.back()} edge="start">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" gutterBottom sx={{ ml: 1 }}>
                    Детали заказа №{order.id}
                </Typography>
            </Box>
            <Typography variant="body1">
                <strong>Дата начала:</strong>{" "}
                {new Date(order.startDate).toLocaleDateString("ru-RU")}
            </Typography>
            <Typography variant="body1">
                <strong>Дата окончания:</strong>{" "}
                {new Date(order.endDate).toLocaleDateString("ru-RU")}
            </Typography>
            <Typography variant="body1">
                <strong>Общая стоимость:</strong> {order.totalPrice}
            </Typography>
            <Typography variant="body1">
                <strong>Статус:</strong> {order.status}
            </Typography>
            <Typography variant="body1">
                <strong>Создано:</strong>{" "}
                {new Date(order.createdAt).toLocaleString("ru-RU")}
            </Typography>

            <Box sx={{ mt: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Информация о велосипеде:
                </Typography>
                {order.bike ? (
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="body2">
                            <strong>ID:</strong> {order.bike.id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Название:</strong> {order.bike.name}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Модель:</strong> {order.bike.model}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Описание:</strong> {order.bike.description}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Доступность:</strong> {order.bike.availability_status}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Сток:</strong> {order.bike.stock}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Нет данных о велосипеде.
                    </Typography>
                )}
            </Box>

            <Box sx={{ mt: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Информация о клиенте:
                </Typography>
                {order.user ? (
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="body2">
                            <strong>ID:</strong> {order.user.id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Имя:</strong> {order.user.firstName} {order.user.lastName}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Email:</strong> {order.user.email}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Телефон:</strong> {order.user.phoneNumber}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Нет данных о клиенте.
                    </Typography>
                )}
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Изменить статус заказа
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="order-status-label">Статус</InputLabel>
                    <Select
                        labelId="order-status-label"
                        value={newStatus}
                        label="Статус"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="on_payment">На оплате</MenuItem>
                        <MenuItem value="active">Активен</MenuItem>
                        <MenuItem value="completed">Завершён</MenuItem>
                        <MenuItem value="cancelled">Отменён</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleStatusUpdate}>
                    Обновить статус
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Paper>
    );
}