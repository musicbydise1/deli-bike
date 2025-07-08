'use client';

import React from 'react';
import NextLink from 'next/link';
import { useGetCouriersQuery } from '@/store/services/adminApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';

export default function CouriersTab() {
  const { data, isLoading: loading, error } = useGetCouriersQuery();
  const couriers = Array.isArray(data?.data) ? data.data : [];

  if (loading) {
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
      <Typography variant="h5" gutterBottom>
        Управление курьерами
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Здесь вы можете просматривать статус курьеров и переходить к их заказам.
      </Typography>

      {couriers.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Курьеров пока нет.
        </Alert>
      ) : (
        <List>
          {couriers.map(c => (
            <React.Fragment key={c.id}>
              <ListItem
                secondaryAction={
                  <Button
                    component={NextLink}
                    href={`/admin-couriers/${c.id}`}
                    variant="outlined"
                    size="small"
                  >
                    Заказы
                  </Button>
                }
              >
                <ListItemText
                  primary={`${c.firstName} ${c.lastName}`}
                  secondary={
                    <Chip
                      label={c.status}
                      color={c.status === 'online' ? 'success' : 'default'}
                      size="small"
                    />
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}
