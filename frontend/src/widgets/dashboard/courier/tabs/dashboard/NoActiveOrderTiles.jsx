'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Box,
  Title,
  Text,
  Flex,
  SimpleGrid,
  Card,
  Center,
  Container,
  Loader,
} from '@mantine/core';
import { AiOutlineLoading } from 'react-icons/ai';
import Image from 'next/image';
import { useGetBikesQuery } from '@/store/services/bikesApi';
import { useTranslation } from 'react-i18next';

export default function NoActiveOrderTiles() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetBikesQuery();
  const bikes = Array.isArray(data?.data) ? data.data : [];
  const [loadingBikeId, setLoadingBikeId] = useState(null);
  const router = useRouter();
  if (error) console.error('Ошибка загрузки байков:', error);

  const handleRent = id => {
    setLoadingBikeId(id);
    router.push(`/bike/${id}`);
  };

  return (
    <Container p={{ base: 'md', md: 'lg', lg: 'xl' }}>
      <Title order={1} mb="xs">
        {t('dashboard')}
      </Title>
      <Text color="dimmed" mb="xl">
        Выберите свой первый электросамокат
      </Text>

      {isLoading ? (
        <Center h={160}>
          <Loader size="lg" />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mb="lg">
          {bikes.length === 0 ? (
            <Text color="dimmed">Нет доступных байков для аренды</Text>
          ) : (
            bikes.map(bike => (
              <Card key={bike.id} padding="md" radius="md" withBorder>
                <Card.Section>
                  <Box h={160} mb="md">
                    <Center h="100%">
                      {bike.imageUrls && bike.imageUrls.length > 0 ? (
                        <Image
                          src={bike.imageUrls[0]}
                          alt={bike.name}
                          width={300}
                          height={160}
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Text color="dimmed">IMAGE</Text>
                      )}
                    </Center>
                  </Box>
                </Card.Section>

                <Title order={3} tt="uppercase" mb="md" ta="center">
                  {bike.name} - {bike.model}
                </Title>

                <Button
                  variant="filled"
                  color="#ff5500"
                  onClick={() => handleRent(bike.id)}
                  disabled={loadingBikeId === bike.id}
                  fullWidth
                >
                  {loadingBikeId === bike.id ? <Loader size="sm" color="white" /> : t('bikes.rent')}
                </Button>
              </Card>
            ))
          )}
        </SimpleGrid>
      )}
    </Container>
  );
}
