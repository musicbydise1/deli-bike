'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function BikesTable({ bikes, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'background.default' }}>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Модель</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Макс. скорость</TableCell>
            <TableCell>Цены</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikes.map(bike => (
            <TableRow key={bike.id} hover>
              <TableCell>{bike.id}</TableCell>
              <TableCell>{bike.name}</TableCell>
              <TableCell>{bike.model}</TableCell>
              <TableCell>{bike.availability_status}</TableCell>
              <TableCell>{bike.maxSpeed} км/ч</TableCell>
              <TableCell>
                {bike.prices && bike.prices.length > 0 ? (
                  <List dense disablePadding>
                    {bike.prices.map(p => (
                      <ListItem key={p.id} sx={{ py: 0 }}>
                        <ListItemText
                          primaryTypographyProps={{ variant: 'body2' }}
                          primary={`${p.priceCategory?.name}: ${p.price} USD`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Нет цены
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Tooltip title="Изменить">
                    <IconButton size="small" onClick={() => onEdit(bike)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton size="small" onClick={() => onDelete(bike.id)} color="error">
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
