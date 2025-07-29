'use client';
import React, { useState } from 'react';
import { Paper, Title, Text, TextInput, Textarea, Button, Group, Stack, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { IconPhone, IconMail } from '@tabler/icons-react';

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: value =>
        value.trim().length < 2
          ? t('contactForm.validation.nameRequired', 'Name is required')
          : null,
      email: value =>
        /^\S+@\S+$/.test(value) ? null : t('contactForm.validation.emailInvalid', 'Invalid email'),
      message: value =>
        value.trim().length < 10
          ? t('contactForm.validation.messageLength', 'Message should be at least 10 characters')
          : null,
    },
  });

  const handleSubmit = values => {
    // Logic to send data to server or email
    console.log('Form submitted:', values);
    alert(t('contactForm.submitSuccess', 'Your message has been sent!'));
    form.reset();
    setSubmitted(true);
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Title order={3} mb="md">
        {t('contactForm.title', 'Contact Us')}
      </Title>

      <Text c="dimmed" size="sm" mb="md">
        {t(
          'contactForm.description',
          "If you couldn't find an answer to your question, you can contact our support team:",
        )}
      </Text>

      {/* Contact information */}
      <Stack mb="md">
        <Group gap="xs">
          <IconPhone size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
          <Text>{t('contactForm.phone', '+7 (777) 123-45-67')}</Text>
        </Group>
        <Group gap="xs">
          <IconMail size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
          <Text>{t('contactForm.email', 'support@delilux.kz')}</Text>
        </Group>
        <Text size="sm" c="dimmed">
          {t('contactForm.workingHours', 'We work 7 days a week from 9:00 to 21:00.')}
        </Text>
      </Stack>

      {/* Feedback form */}
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label={t('contactForm.fields.name', 'Your Name')}
            placeholder={t('contactForm.placeholders.name', 'Enter your name')}
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label={t('contactForm.fields.email', 'Your Email')}
            placeholder={t('contactForm.placeholders.email', 'Enter your email')}
            required
            {...form.getInputProps('email')}
          />
          <Textarea
            label={t('contactForm.fields.message', 'Message')}
            placeholder={t('contactForm.placeholders.message', 'Describe your problem or question')}
            minRows={4}
            required
            {...form.getInputProps('message')}
          />
          <Button type="submit" color="orange" mt="sm">
            {t('contactForm.submit', 'Send')}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
