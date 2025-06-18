'use client';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FaqAccordion() {
  // Пример данных для FAQ
  const faqItems = [
    {
      question: 'Как продлить аренду?',
      answer:
        'Чтобы продлить аренду, перейдите в раздел «Мои заказы», выберите активный заказ и нажмите кнопку «Продлить». Далее следуйте инструкциям по оплате и срокам продления.',
    },
    {
      question: 'Что делать, если велосипед сломался?',
      answer:
        'Если вы столкнулись с неисправностью или поломкой, немедленно свяжитесь с нашей службой поддержки по телефону или электронной почте. Мы поможем решить проблему или организуем замену велосипеда.',
    },
    {
      question: 'Можно ли сдать велосипед раньше срока?',
      answer:
        'Да, вы можете сдать велосипед раньше срока аренды, однако стоимость аренды при этом не пересчитывается. Свяжитесь с нами, если хотите досрочно вернуть велосипед.',
    },
  ];

  // Состояние для управления открытыми пунктами FAQ (JS без типов)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы</h2>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded w-full">
        {faqItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <FiChevronDown
                className={`transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                } text-gray-500`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700 text-sm">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
