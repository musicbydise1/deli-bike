'use client';
import React from 'react';
import { Container, Title, Text, Paper, List, Stack, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconCircleDot } from '@tabler/icons-react';

export default function ReturnPolicyTab() {
  const { t } = useTranslation();

  return (
    <Container size="md" p="md">
      <Title order={2} mb="md">
        {t('returnPolicy.title', 'Return Policy')}
      </Title>
      <Text size="sm" c="dimmed" mb="xl">
        {t('returnPolicy.lastUpdated', 'Last updated: 10.03.2025')}
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Text>
            {t(
              'returnPolicy.intro',
              'This document describes the rules and conditions for returning electric bicycles and other goods/services provided by the company',
            )}{' '}
            <Text span fw={700}>
              DeliLux
            </Text>{' '}
            {t(
              'returnPolicy.introEnd',
              '(hereinafter referred to as the "Company"). These return conditions are mandatory for all users wishing to use the Company\'s services.',
            )}
          </Text>

          <Title order={3}>
            {t('returnPolicy.sections.general.title', '1. General Provisions')}
          </Title>
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t(
                'returnPolicy.sections.general.items.0',
                'Return of an electric bicycle (hereinafter referred to as the "Bicycle") is possible only in accordance with these conditions and current legislation.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.general.items.1',
                'When returning the Bicycle, it is necessary to make sure that it is in working order and there is no external damage not related to natural wear and tear.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.general.items.2',
                'If significant damage caused by improper use is found, the Company has the right to refuse the return or charge the cost of repairs.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('returnPolicy.sections.terms.title', '2. Terms and Procedure for Return')}
          </Title>
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t(
                'returnPolicy.sections.terms.items.0',
                'The Bicycle must be returned within the rental period specified in the contract, or another agreed period.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.terms.items.1',
                "To arrange a return, you need to contact the Company's support service and agree on the place and time of receiving the Bicycle.",
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.terms.items.2',
                'In case of early return of the Bicycle, the rental cost is not recalculated, unless otherwise specified in the contract.',
              )}
            </List.Item>
          </List>

          <Title order={3}>{t('returnPolicy.sections.refund.title', '3. Refund of Funds')}</Title>
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t(
                'returnPolicy.sections.refund.items.0',
                'If the Bicycle is returned for reasons beyond the control of the renter (for example, factory defect or Company errors), a partial or full refund is possible.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.refund.items.1',
                'The timing of the refund depends on the payment method used and can take up to 10 business days.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.refund.items.2',
                'The commission of payment systems when refunding is not reimbursed, except in cases where this is provided for by law.',
              )}
            </List.Item>
          </List>

          <Title order={3}>{t('returnPolicy.sections.special.title', '4. Special Cases')}</Title>
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="gray" size={24} radius="xl">
                <IconCircleDot size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              {t(
                'returnPolicy.sections.special.items.0',
                'In case of loss of the Bicycle or its significant damage, no return is made. The renter bears full responsibility for the damage caused.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.special.items.1',
                'If the return cannot be made within the established time frame through the fault of the renter, the Company has the right to charge additional payments in accordance with the contract.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'returnPolicy.sections.special.items.2',
                'All disputes related to the return are resolved in accordance with the current legislation of the Republic of Kazakhstan.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('returnPolicy.sections.changes.title', '5. Changes and Additions')}
          </Title>
          <Text>
            {t(
              'returnPolicy.sections.changes.content',
              "The Company reserves the right to make changes to these return conditions. The new version of the conditions comes into force from the moment of its publication on the Company's website. Continued use of the Company's services means the renter's consent to the changes made.",
            )}
          </Text>

          <Text>
            {t(
              'returnPolicy.conclusion',
              "If you have any questions or suggestions regarding the return conditions, please contact the Company's support service.",
            )}
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
