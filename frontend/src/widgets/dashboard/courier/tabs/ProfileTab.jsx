'use client';
import React, { useState, useEffect } from 'react';
import { IconCheck, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import {
  Container,
  Title,
  Text,
  Grid,
  Avatar,
  Paper,
  Group,
  Button,
  Stack,
  Box,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function ProfileTab() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Read data from localStorage on mount
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error(t('profile.errors.parseError', 'Error parsing userData:'), error);
      }
    }
  }, [t]);

  // If no data in localStorage
  if (!userData) {
    return (
      <Container size="md" p="md">
        <Title order={2} mb="md">
          {t('profile.title', 'My Profile')}
        </Title>
        <Text c="dimmed">{t('profile.noData', 'User data not found.')}</Text>
      </Container>
    );
  }

  // Check if user has profile image
  const hasProfileImage = !!userData.profileImage;

  return (
    <Container size="lg" p="md">
      <Title order={2} mb="xl">
        {t('profile.title', 'My Profile')}
      </Title>

      <Paper withBorder p="md" radius="md">
        {/* Avatar centered */}
        <Box ta="center" mb="lg">
          {hasProfileImage ? (
            <Avatar
              src={userData.profileImage}
              alt={t('profile.avatar.alt', 'User avatar')}
              size={128}
              radius={9999}
            />
          ) : (
            <Avatar color="gray" size={128} radius={9999}>
              <IconUser size={48} />
            </Avatar>
          )}
        </Box>

        {/* User information */}
        <Grid gutter="md">
          {/* First name and last name */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.firstName', 'First Name')}
              </Text>
              <Text fw={600}>{userData.firstName || '—'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.lastName', 'Last Name')}
              </Text>
              <Text fw={600}>{userData.lastName || '—'}</Text>
            </Stack>
          </Grid.Col>

          {/* Patronymic and Email */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.patronymic', 'Patronymic')}
              </Text>
              <Text>{userData.patronymic || '—'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.email', 'Email')}
              </Text>
              <Text>{userData.email}</Text>
            </Stack>
          </Grid.Col>

          {/* Phone and Telegram */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.phone', 'Phone')}
              </Text>
              <Text>{userData.phoneNumber || '—'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.telegram', 'Telegram')}
              </Text>
              {userData.telegramChatId ? (
                <Group gap="xs" c="green">
                  <Text>{t('profile.fields.telegramConnected', 'Connected')}</Text>
                  <IconCheck size={16} />
                </Group>
              ) : (
                <Text>—</Text>
              )}
            </Stack>
          </Grid.Col>

          {/* Company and Address */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.company', 'Company')}
              </Text>
              <Text>{userData.companyName || '—'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.address', 'Address')}
              </Text>
              <Text>{userData.address || '—'}</Text>
            </Stack>
          </Grid.Col>

          {/* Balance and Role */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.balance', 'Balance')}
              </Text>
              <Text>
                {userData.walletBalance || '0.00'} {userData.preferredCurrency || ''}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                {t('profile.fields.role', 'Role')}
              </Text>
              <Text tt="capitalize">{userData.roles?.[0]?.name || 'user'}</Text>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Buttons */}
        <Group justify="center" mt="xl">
          <Button color="orange">{t('profile.buttons.edit', 'Edit')}</Button>
          <Button variant="light" color="gray">
            {t('profile.buttons.changePassword', 'Change Password')}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
