'use client';
import React from 'react';
import { useGetRentalsQuery } from '@/store/services/rentalsApi';
import { IconEye } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Table,
  Group,
  Image,
  Stack,
  ActionIcon,
  Loader,
  Alert,
  Box,
  Paper,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function RentTab() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading, error } = useGetRentalsQuery();
  const rentals = Array.isArray(data?.data) ? data.data : [];

  const handleViewClick = id => {
    router.push(`/orders/${id}`);
  };

  if (isLoading) {
    return (
      <Box p="md">
        <Loader size="md" />
        <Text mt="xs">{t('rent.loading', 'Loading orders...')}</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert title={t('rent.error', 'Error')} color="red" p="md">
        {error.toString()}
      </Alert>
    );
  }

  return (
    <Container size="xl" p="md">
      <Title order={1} mb="xl">
        {t('rent.title', 'ORDERS')}
      </Title>

      <Paper withBorder p={0}>
        <Box style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('rent.table.model', 'Model')}</Table.Th>
                <Table.Th>{t('rent.table.orderNumber', 'Order #')}</Table.Th>
                <Table.Th>{t('rent.table.orderDate', 'Order Date')}</Table.Th>
                <Table.Th>{t('rent.table.itemsCount', 'Items in Order')}</Table.Th>
                <Table.Th>{t('rent.table.amount', 'Amount')}</Table.Th>
                <Table.Th>{t('rent.table.actions', 'Actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rentals.map(rental => {
                const bike = rental.bike || {};
                const startDate = new Date(rental.startDate).toLocaleDateString(
                  t('rent.locale', 'en-US'),
                );
                const endDate = new Date(rental.endDate).toLocaleDateString(
                  t('rent.locale', 'en-US'),
                );
                const itemsCount = t('rent.itemsCount', '1 pc');
                const priceTenge =
                  Number(rental.totalPrice).toLocaleString(t('rent.locale', 'en-US')) + ' ₸';

                return (
                  <Table.Tr key={rental.id}>
                    <Table.Td>
                      <Group gap="sm">
                        {bike.imageUrls && bike.imageUrls.length > 0 ? (
                          <Image
                            src={bike.imageUrls[0]}
                            alt={t('rent.bikeImage', 'Bike')}
                            w={64}
                            h={64}
                            radius="md"
                          />
                        ) : (
                          <Box w={64} h={64} bg="gray.2" style={{ borderRadius: 8 }} />
                        )}
                        <Stack gap={4}>
                          <Text fw={600}>{bike.name || t('rent.noName', 'No name')}</Text>
                          <Text size="xs" c="dimmed">
                            {bike.model || t('rent.noModel', 'No model')}
                          </Text>
                        </Stack>
                      </Group>
                    </Table.Td>
                    <Table.Td>№{rental.id}</Table.Td>
                    <Table.Td>
                      {startDate} - {endDate}
                    </Table.Td>
                    <Table.Td>{itemsCount}</Table.Td>
                    <Table.Td>{priceTenge}</Table.Td>
                    <Table.Td>
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleViewClick(rental.id)}
                        aria-label={t('rent.view', 'View')}
                      >
                        <IconEye size={18} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
}
