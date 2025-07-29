'use client';
import React from 'react';
import Link from 'next/link';
import ProgressBar from '@/shared/ui/ui/progress-bar/ProgressBar';
import Image from 'next/image';
import { Card, Text, Title, Group, Button, Box, Center, Stack, Progress } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function ActiveOrderCard({ activeOrder }) {
  const { t } = useTranslation();
  const bike = activeOrder.bike || {};

  // Rental start and end dates
  const start = new Date(activeOrder.startDate);
  const end = new Date(activeOrder.endDate);
  const now = new Date();

  // Total days between startDate and endDate
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  // Days passed since the start of the rental
  const daysPassed = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));

  // Ensure the progress doesn't exceed boundaries
  const activeIndex = Math.min(daysPassed, totalDays);

  // Days left until the end of the rental
  const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  // Calculate progress percentage
  const progressValue = totalDays > 0 ? (activeIndex / totalDays) * 100 : 0;

  return (
    <Card padding="md" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Box>
          <Text size="sm" c="dimmed">
            {t('activeOrder.orderNumber', 'Заказ №')}
            {activeOrder.id}
          </Text>
          <Title order={3} tt="uppercase">
            {bike.name || t('activeOrder.bikeName', 'Название байка')} {bike.model}
          </Title>
        </Box>
      </Group>

      <Box h={192} mb="md">
        <Center h="100%">
          {bike.imageUrls && bike.imageUrls.length > 0 ? (
            <Image
              width={300}
              height={192}
              src={bike.imageUrls[0]}
              alt={bike.name || t('activeOrder.bike', 'Байк')}
              style={{ height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Text c="dimmed">{t('activeOrder.image', 'ИЗОБРАЖЕНИЕ')}</Text>
          )}
        </Center>
      </Box>

      {/* Alternative block for on_payment status */}
      {activeOrder.status === 'on_payment' ? (
        <Stack>
          <Text size="sm" c="red.6">
            {t('activeOrder.notPaid', 'Ваш заказ ещё не оплачен. Необходимо оплатить в течение')}
            <Text span fw={600}>
              {' '}
              72 {t('activeOrder.hours', 'часов')}
            </Text>
            {t('activeOrder.andPickup', 'и забрать велосипед в отделении.')}
          </Text>
          <Button component="a" href="/invoice" color="orange" fullWidth tt="uppercase">
            {t('activeOrder.goToInvoice', 'Перейти к счёту')}
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Text size="sm">
            {t('activeOrder.expiresIn', 'Срок аренды истекает через')}{' '}
            <Text span c="orange" fw={500}>
              {daysLeft} {t('activeOrder.days', 'дней')}
            </Text>
          </Text>

          <Box mb="md">
            <Progress value={progressValue} color="orange" size="md" radius="xs" />
            <Group justify="space-between" mt={4}>
              <Text size="xs" c="dimmed">
                {start.toLocaleDateString('ru-RU')}
              </Text>
              <Text size="xs" c="dimmed">
                {end.toLocaleDateString('ru-RU')}
              </Text>
            </Group>
          </Box>

          <Group grow>
            <Button color="orange" tt="uppercase">
              {t('activeOrder.extend', 'Продлить')}
            </Button>
            <Button
              component={Link}
              href={`/orders/${activeOrder.id}`}
              variant="light"
              color="gray"
              tt="uppercase"
            >
              {t('activeOrder.details', 'Подробнее')}
            </Button>
          </Group>
        </Stack>
      )}
    </Card>
  );
}
