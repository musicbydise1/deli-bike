'use client';

import React from 'react';
import { useGetRentalsQuery } from '@/store/services/rentalsApi';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function OrdersTab() {
  const { data, isLoading, error } = useGetRentalsQuery();
  const rentals = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Ошибка: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление заказами
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Здесь отображаются все заказы. Вы можете изменять статус заказов и просматривать их детали.
      </Typography>

      {rentals.length === 0 ? (
        <Alert severity="info">Заказов пока нет.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
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
              {rentals.map(r => (
                <TableRow hover key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{new Date(r.startDate).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>{new Date(r.endDate).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>{r.totalPrice} ₸</TableCell>
                  <TableCell>
                    <Chip label={r.status} size="small" />
                  </TableCell>
                  <TableCell>{new Date(r.createdAt).toLocaleString('ru-RU')}</TableCell>
                  <TableCell>{r.bike ? `${r.bike.name} ${r.bike.model}` : 'Н/Д'}</TableCell>
                  <TableCell>{r.user ? `${r.user.firstName} ${r.user.lastName}` : 'Н/Д'}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Подробнее">
                      <IconButton
                        component={NextLink}
                        href={`/admin-orders/${r.id}`}
                        size="small"
                        color="primary"
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
