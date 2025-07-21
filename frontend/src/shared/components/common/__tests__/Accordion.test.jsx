import { render, screen } from '@testing-library/react';
import Accordion from '../Accordion';

const faqs = [{ question: 'Question?', answer: 'Answer.' }];

test('renders question text', () => {
  render(<Accordion faqs={faqs} />);
  expect(screen.getByText('Question?')).toBeInTheDocument();
});
