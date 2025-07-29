'use client';
import React from 'react';
import { 
  Title, 
  Accordion, 
  Paper,
  Box
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function FaqAccordion() {
  const { t } = useTranslation();

  // FAQ data with translations
  const faqItems = [
    {
      question: t('faq.items.0.question', 'How to extend the rental?'),
      answer: t('faq.items.0.answer', 
        'To extend the rental, go to the "My Orders" section, select the active order and click the "Extend" button. Then follow the instructions for payment and extension terms.')
    },
    {
      question: t('faq.items.1.question', 'What to do if the bicycle breaks down?'),
      answer: t('faq.items.1.answer', 
        'If you encounter a malfunction or breakdown, immediately contact our support service by phone or email. We will help solve the problem or arrange a bicycle replacement.')
    },
    {
      question: t('faq.items.2.question', 'Can I return the bicycle before the rental period ends?'),
      answer: t('faq.items.2.answer', 
        'Yes, you can return the bicycle before the rental period ends, however, the rental cost is not recalculated. Contact us if you want to return the bicycle early.')
    }
  ];

  return (
    <Box mb="xl">
      <Title order={3} mb="md">{t('faq.title', 'Frequently Asked Questions')}</Title>
      <Paper withBorder>
        <Accordion>
          {faqItems.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Paper>
    </Box>
  );
}
