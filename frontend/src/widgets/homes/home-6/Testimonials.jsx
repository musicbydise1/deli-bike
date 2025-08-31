'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { clients, testimonials2 } from '@/data/testimonials';
import {
  Box,
  Button,
  Stack,
  Container,
  Grid,
  Title,
  Text,
  Paper,
  Group,
  Modal,
  Center,
} from '@mantine/core';
import FormModalContent from '@/widgets/homes/home-6/FormModalContent';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const [userRole, setUserRole] = useState('courier');
  const [userRoleCookie, setUserRoleCookie] = useState('courier');
  const { t } = useTranslation('common');

  // Состояние для открытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Получаем роль пользователя из cookies
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRole(role);
    }
  }, []);

  // Функции открытия/закрытия модального окна
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleUserRole = () => {
    const newRole = userRole === 'courier' ? 'corporate' : 'courier';
    document.cookie = `userRole=${newRole}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <>
      <Box py={50} sx={{ backgroundColor: '#ff5500' }}>
        <Container size="xl">
          <Grid>
            {/* Left column with title and image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box>
                <Title order={1} mb="md" style={{ textTransform: 'uppercase' }}>
                  {t('home.testimonials.title')}
                </Title>
                <Text mb="xl" size="lg">
                  {t('home.testimonials.description')}
                </Text>
                <Box mt="md">
                  <Center>
                    <Image
                      alt="DeliBike banner"
                      title="DeliBike"
                      src="/images/testiominals-bike1.png"
                      width={350}
                      height={371}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Center>
                </Box>
              </Box>
            </Grid.Col>

            {/* Right column with client cards */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Grid>
                {clients.map((client, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                    <Paper shadow="sm" p="md" radius="md" h="100%">
                      <Title order={3} mb="md">
                        {t(`home.testimonials.clients.${client.type}.title`)}
                      </Title>
                      <Stack spacing="sm" mb="md">
                        {client.description.map((item, idx) => (
                          <Box key={idx} mb="xs">
                            <Text fw={700}>
                              {t(`home.testimonials.clients.${client.type}.items.${idx}.title`)}
                            </Text>
                            <Text size="sm" color="dimmed">
                              {t(`home.testimonials.clients.${client.type}.items.${idx}.text`)}
                            </Text>
                          </Box>
                        ))}
                      </Stack>
                      <Box mt="auto">
                        {userRole === client.type ? (
                          <Button fullWidth variant="light" color="#ff5500" onClick={openModal}>
                            {t('home.testimonials.buttons.apply')}
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            variant="outline"
                            color="#ff5500"
                            onClick={toggleUserRole}
                          >
                            {t('home.testimonials.buttons.more')}
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Modal with form */}
      <Modal opened={isModalOpen} onClose={closeModal} size="md" centered>
        <FormModalContent />
      </Modal>
    </>
  );
}
