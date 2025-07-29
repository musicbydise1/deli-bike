'use client';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Title,
  Text,
  Stack,
  Card,
  Group,
  Badge,
  Box,
  Button,
  Flex,
  Center,
  ActionIcon,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function HistoryOrders({ historyRentals, setActiveTab }) {
  const router = useRouter();
  const { t } = useTranslation();

  // Take only the last 3 rentals
  const lastThreeRentals = historyRentals.slice(-3);

  return (
    <Box>
      <Title order={3} mb="md" tt="uppercase">
        {t('history.title', 'ПОСЛЕДНИЕ ЗАКАЗЫ')}
      </Title>
      <Stack gap="sm">
        {lastThreeRentals.length === 0 ? (
          <Text size="sm" c="dimmed">
            {t('history.noOrders', 'Нет заказов в истории')}
          </Text>
        ) : (
          lastThreeRentals.map(rental => {
            const bikeInfo = rental.bike || {};
            return (
              <Card key={rental.id} padding="sm" radius="md" withBorder pos="relative">
                <ActionIcon
                  component={Link}
                  href={`/orders/${rental.id}`}
                  variant="transparent"
                  color="orange"
                  pos="absolute"
                  top={8}
                  right={8}
                >
                  <AiOutlineEye size={20} />
                </ActionIcon>

                <Group align="flex-start" gap="md">
                  <Box w={56} h={56} bg="gray.1" style={{ flexShrink: 0 }}>
                    <Center h="100%">
                      {bikeInfo.imageUrls && bikeInfo.imageUrls.length > 0 ? (
                        <Image
                          src={bikeInfo.imageUrls[0]}
                          alt={bikeInfo.name || t('history.bike', 'Байк')}
                          width={56}
                          height={56}
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Text size="xs" c="dimmed">
                          IMG
                        </Text>
                      )}
                    </Center>
                  </Box>

                  <Box style={{ flex: 1 }}>
                    <Text size="xs" c="dimmed">
                      {t('history.orderNumber', 'Заказ №')} {rental.id}
                    </Text>
                    <Text fw={600} size="sm" tt="uppercase">
                      {bikeInfo.name || t('history.unnamed', 'Без названия')} {bikeInfo.model}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {t('history.rentalPeriod', 'Срок аренды')}:{' '}
                      <Text span c="dark">
                        {new Date(rental.startDate).toLocaleDateString('ru-RU')} –{' '}
                        {new Date(rental.endDate).toLocaleDateString('ru-RU')}
                      </Text>
                    </Text>
                    <Text size="xs" c="dimmed">
                      {t('history.status', 'Статус')}: {rental.status}
                    </Text>
                  </Box>
                </Group>

                <Group gap="xs" mt="xs">
                  <Badge color="orange" variant="light" size="sm">
                    {t('history.accessories', 'Аксессуаров')}: {rental.accessoriesCount ?? 0}{' '}
                    {t('history.pcs', 'шт')}
                  </Badge>
                  <Badge color="orange" variant="light" size="sm">
                    {t('history.amount', 'Сумма')}:{' '}
                    {Math.round(rental.totalPrice).toLocaleString('ru-RU') ?? 0} ₸
                  </Badge>
                </Group>
              </Card>
            );
          })
        )}
      </Stack>

      <Box mt="md">
        <Button variant="light" color="gray" fullWidth onClick={() => setActiveTab('rent')}>
          {t('history.allOrders', 'Все заказы')}
        </Button>
      </Box>
    </Box>
  );
}
