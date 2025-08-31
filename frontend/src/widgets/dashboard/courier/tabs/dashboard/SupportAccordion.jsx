'use client';
import React from 'react';
import { Accordion, Title, Paper, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function SupportAccordion({ supportItems }) {
  const { t } = useTranslation();

  return (
    <Box mt="xl">
      <Paper p="md" radius="md" withBorder>
        <Title order={3} mb="md">
          {t('support.title', 'Поддержка')}
        </Title>
        <Accordion>
          {supportItems.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Control>{t(`support.items.${index}.title`, item.title)}</Accordion.Control>
              <Accordion.Panel>{t(`support.items.${index}.content`, item.content)}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Paper>
    </Box>
  );
}
