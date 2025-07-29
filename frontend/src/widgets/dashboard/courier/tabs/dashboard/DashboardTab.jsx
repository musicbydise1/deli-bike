'use client';
import React, { useState, useEffect } from 'react';
import {
  useGetRentalsByUserQuery,
  useGetRentalHistoryByUserQuery,
} from '@/store/services/rentalsApi';
import NoActiveOrderTiles from './NoActiveOrderTiles';
import ActiveOrderCard from './ActiveOrderCard';
import HistoryOrders from './HistoryOrders';
import SupportAccordion from './SupportAccordion';
import { Container, Title, Text, Grid, Box, Loader, Alert } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconAlertCircle } from '@tabler/icons-react';

export default function DashboardTab({ setActiveTab }) {
  const { t } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [activeRentals, setActiveRentals] = useState([]);
  const [historyRentals, setHistoryRentals] = useState([]);

  const {
    data: activeData,
    isLoading: loadingActive,
    error: activeError,
  } = useGetRentalsByUserQuery(userId, { skip: userId === null });

  const {
    data: historyData,
    isLoading: loadingHistory,
    error: historyError,
  } = useGetRentalHistoryByUserQuery(userId, { skip: userId === null });

  const loading = loadingActive || loadingHistory;
  const error = activeError || historyError;

  // Support items array
  const supportItems = [
    {
      title: t('support.items.0.title', 'Техническое обслуживание'),
      content: t(
        'support.items.0.content',
        'Информация о сервисном обслуживании, периодичности ТО, контактах сервисных центров и т.д.',
      ),
    },
    {
      title: t('support.items.1.title', 'Правила эксплуатации электробайков'),
      content: t(
        'support.items.1.content',
        'Основные рекомендации по использованию, безопасной езде и уходе за электробайком.',
      ),
    },
    {
      title: t('support.items.2.title', 'Правила эксплуатации АКБ (аккумуляторов)'),
      content: t(
        'support.items.2.content',
        'Информация о зарядке, хранении и обслуживании аккумуляторных батарей, чтобы продлить срок службы.',
      ),
    },
    {
      title: t('support.items.3.title', 'Связаться с нами'),
      content: t(
        'support.items.3.content',
        'Телефон горячей линии: +7 (777) 123-45-67. Email: support@delilux.kz. Адрес: г. Алматы, пр. Достык, 123.',
      ),
    },
  ];

  // Read userId from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('userData');
    if (raw) {
      try {
        const user = JSON.parse(raw);
        setUserId(user.id);
      } catch (err) {
        console.error(t('dashboard.errors.parseError', 'Не удалось распарсить userData:'), err);
      }
    } else {
      console.warn(t('dashboard.errors.noUserData', 'userData нет в localStorage'));
    }
  }, [t]);

  // Update local state when API data is received
  useEffect(() => {
    if (activeData?.data) {
      setActiveRentals(activeData.data);
    }
  }, [activeData]);

  useEffect(() => {
    if (historyData?.data) {
      setHistoryRentals(historyData.data);
    }
  }, [historyData]);

  if (loading) {
    return (
      <Box p="md">
        <Loader size="md" />
        <Text mt="xs">{t('dashboard.loading', 'Загрузка данных об арендах...')}</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title={t('dashboard.error', 'Ошибка')}
        color="red"
        p="md"
      >
        {error.toString()}
      </Alert>
    );
  }

  // Find order with status 'active' or 'on_payment'
  const activeOrder = activeRentals.find(r => r.status === 'active' || r.status === 'on_payment');

  // If no active order - show tiles
  if (!activeOrder) {
    return (
      <>
        <NoActiveOrderTiles />
        <SupportAccordion supportItems={supportItems} />
      </>
    );
  }

  // If there is an active order - show card + history + support
  return (
    <Container fluid p={0}>
      <Title order={1} mb="xs">
        {t('dashboard.title', 'Личный кабинет')}
      </Title>
      <Text c="dimmed" mb="xl">
        {t('dashboard.subtitle', 'Персональный центр управления вашей арендой')}
      </Text>

      <Grid gutter="md">
        {/* Left part: active order */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <ActiveOrderCard activeOrder={activeOrder} />
        </Grid.Col>

        {/* Right part: history */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <HistoryOrders historyRentals={historyRentals} setActiveTab={setActiveTab} />
        </Grid.Col>
      </Grid>

      <SupportAccordion supportItems={supportItems} />
    </Container>
  );
}
