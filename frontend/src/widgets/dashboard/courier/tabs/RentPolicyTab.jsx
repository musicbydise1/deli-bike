'use client';
import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  List, 
  Stack,
  ThemeIcon
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconCircleDot } from '@tabler/icons-react';

export default function RentPolicyTab() {
  const { t } = useTranslation();

  return (
    <Container size="md" p="md">
      <Title order={2} mb="md">{t('rentPolicy.title', 'Rent Policy')}</Title>
      <Text size="sm" c="dimmed" mb="xl">{t('rentPolicy.lastUpdated', 'Last updated: 10.03.2025')}</Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Text>
            {t('rentPolicy.intro', 
              'This document describes the rules and conditions for renting electric bicycles and other equipment provided by the company')} <Text span fw={700}>DeliLux</Text> {t('rentPolicy.introEnd', '(hereinafter referred to as the "Company"). These rental terms are mandatory for all users wishing to use the Company\'s services.')}
          </Text>

          <Title order={3}>{t('rentPolicy.sections.general.title', '1. General Provisions')}</Title>
          <List 
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t('rentPolicy.sections.general.items.0', 'The renter must use the rented bicycle (hereinafter referred to as the "Bicycle") exclusively for personal purposes, without violating the legislation of the Republic of Kazakhstan.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.general.items.1', 'When receiving the Bicycle, the renter must check it for the absence of external damage and make sure it is in working order.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.general.items.2', 'The Company reserves the right to refuse rental without explanation.')}
            </List.Item>
          </List>

          <Title order={3}>{t('rentPolicy.sections.payment.title', '2. Payment Terms')}</Title>
          <List 
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t('rentPolicy.sections.payment.items.0', 'The rental cost is calculated based on the tariffs published on the Company\'s official website or in the mobile application.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.payment.items.1', 'Payment for the rental is made at the time of placing an order through available payment systems or other methods specified on the Company\'s website.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.payment.items.2', 'In case of early return of the Bicycle, the rental fee is not recalculated.')}
            </List.Item>
          </List>

          <Title order={3}>{t('rentPolicy.sections.responsibility.title', '3. Renter Responsibility')}</Title>
          <List 
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t('rentPolicy.sections.responsibility.items.0', 'The renter is fully responsible for the safety of the Bicycle for the entire rental period, including the risk of loss or damage.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.responsibility.items.1', 'In case of breakdown or loss of the Bicycle, the renter must immediately report this to the Company\'s support service.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.responsibility.items.2', 'It is forbidden to transfer the Bicycle to third parties without the written consent of the Company.')}
            </List.Item>
          </List>

          <Title order={3}>{t('rentPolicy.sections.return.title', '4. Bicycle Return')}</Title>
          <List 
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t('rentPolicy.sections.return.items.0', 'The renter must return the Bicycle at the agreed time and place specified in the rental agreement.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.return.items.1', 'When returning the Bicycle, the renter must make sure that the Bicycle is clean and has no new damage.')}
            </List.Item>
            <List.Item>
              {t('rentPolicy.sections.return.items.2', 'If damage caused by improper use is detected when the Bicycle is returned, the Company has the right to charge the cost of repairs.')}
            </List.Item>
          </List>

          <Title order={3}>{t('rentPolicy.sections.changes.title', '5. Changes and Additions')}</Title>
          <Text>
            {t('rentPolicy.sections.changes.content', 'The Company reserves the right to make changes to these rental terms. The new version of the terms comes into force from the moment of its publication on the Company\'s website. Continued use of the Company\'s services means the renter\'s consent to the changes made.')}
          </Text>

          <Text>
            {t('rentPolicy.conclusion', 'If you have any questions or suggestions regarding the rental terms, please contact the Company\'s support service.')}
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
