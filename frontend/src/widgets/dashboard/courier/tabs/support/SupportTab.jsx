'use client';
import React from 'react';
import { Container, Title, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import FaqAccordion from './FaqAccordion';
import ContactForm from './ContactForm';

export default function SupportTab() {
  const { t } = useTranslation();

  return (
    <Container size="lg" p="md">
      <Title order={1} mb="xl">{t('support.title', 'Support')}</Title>

      <Stack gap="xl">
        {/* FAQ accordion (full width) */}
        <FaqAccordion />

        {/* Contact form and information (full width) */}
        <ContactForm />
      </Stack>
    </Container>
  );
}
