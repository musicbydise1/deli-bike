'use client';
import React from 'react';
import { formatPrice } from '@/utils/pricingUtils';

export default function AdditionalOptionsSelector({
  accessories,
  selectedAdditional,
  onToggleOption,
  currency,
}) {
  // Вспомогательная функция форматирования цены
  const format = val => formatPrice(val, currency);

  return (
    <div className="section">
      <h4 className="section-title">
        Дополнительно. <span>Какие опции хотите добавить?</span>
      </h4>

      <div className="options-grid">
        {accessories.map(option => {
          // Проверяем, выбрано ли данное опциональное дополнение
          const isSelected = selectedAdditional.some(item => item.value === option.value);

          return (
            <button
              key={option.value}
              className={`option-button ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleOption(option)}
            >
              <span className="section-btn-label">{option.label}</span>
              <span>{format(Math.round(option.price))}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
