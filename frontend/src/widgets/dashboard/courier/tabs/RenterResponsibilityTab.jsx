'use client';
import React from 'react';
import { Container, Title, Text, Paper, List, Stack, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconCircleDot } from '@tabler/icons-react';

export default function RenterResponsibilityTab() {
  const { t } = useTranslation();

  return (
    <Container size="md" p="md">
      <Title order={2} mb="md">
        {t('renterResponsibility.title', 'Renter Responsibility')}
      </Title>
      <Text size="sm" c="dimmed" mb="xl">
        {t('renterResponsibility.lastUpdated', 'Last updated: 10.03.2025')}
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Text>
            {t(
              'renterResponsibility.intro',
              'This section describes the basic rules and responsibilities of the renter (hereinafter referred to as the "Renter") when using an electric bicycle (hereinafter referred to as the "Bicycle") provided by the company',
            )}{' '}
            <Text span fw={700}>
              DeliLux
            </Text>{' '}
            {t(
              'renterResponsibility.introEnd',
              '(hereinafter referred to as the "Company"). Compliance with these conditions is mandatory for all renters.',
            )}
          </Text>

          <Title order={3}>
            {t('renterResponsibility.sections.generalDuties.title', '1. General Duties')}
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
                'renterResponsibility.sections.generalDuties.items.0',
                'The Renter must use the Bicycle exclusively in accordance with its intended purpose and applicable law.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.generalDuties.items.1',
                'It is forbidden to transfer the Bicycle to third parties without the written permission of the Company.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.generalDuties.items.2',
                'The Renter must comply with traffic rules and safety regulations, and is also responsible for any damage caused to property or health of third parties.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('renterResponsibility.sections.penalties.title', '2. Penalties and Fines')}
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
                'renterResponsibility.sections.penalties.items.0',
                'In case of late return of the Bicycle, the Company has the right to charge a penalty in the amount established by the current tariffs or the rental agreement.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.penalties.items.1',
                'For deliberate damage or unauthorized changes to the design of the Bicycle, fines may be imposed, the amount of which is determined by the Company, taking into account the cost of repair or replacement of parts.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.penalties.items.2',
                'If the Bicycle was transferred to third parties without the consent of the Company, the Renter may be fined up to the full cost of the Bicycle.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('renterResponsibility.sections.damages.title', '3. Damage and Loss of the Bicycle')}
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
                'renterResponsibility.sections.damages.items.0',
                'If damage to the Bicycle is detected upon receipt, the Renter must immediately report this to the Company.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.damages.items.1',
                'If the Bicycle was damaged or lost through the fault of the Renter, the latter bears financial responsibility in the amount of the cost of repair or full replacement of the Bicycle.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.damages.items.2',
                'In the event of an insured event (if the Bicycle is insured), the Renter must follow the instructions of the insurance company and the Company for processing documents.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('renterResponsibility.sections.insurance.title', '4. Insurance and Safety')}
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
                'renterResponsibility.sections.insurance.items.0',
                'The Company may provide Bicycle insurance services on the terms specified in the rental agreement.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.insurance.items.1',
                'The Renter must observe all precautions, including the use of protective equipment and compliance with speed limits.',
              )}
            </List.Item>
            <List.Item>
              {t(
                'renterResponsibility.sections.insurance.items.2',
                'In case of an accident or accident, the Renter must immediately notify the Company and, if necessary, call emergency services.',
              )}
            </List.Item>
          </List>

          <Title order={3}>
            {t('renterResponsibility.sections.disputes.title', '5. Disputes and Disagreements')}
          </Title>
          <Text>
            {t(
              'renterResponsibility.sections.disputes.content',
              'All disputes and disagreements related to compliance with these rules of responsibility are resolved through negotiations. If an agreement is not reached, the dispute is subject to consideration in court in accordance with the legislation of the Republic of Kazakhstan.',
            )}
          </Text>

          <Text>
            {t(
              'renterResponsibility.conclusion',
              'Compliance with these conditions will ensure safety and comfort for all road users, as well as avoid possible conflict situations between the Renter and the Company.',
            )}
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
