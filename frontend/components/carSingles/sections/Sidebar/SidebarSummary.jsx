// src/components/Sidebar/SidebarSummary.jsx
'use client';
import React from 'react';
import { formatPrice } from '@/utils/sidePricingUtils';

const SidebarSummary = ({
  rentalPeriod,
  rentalPrice,
  selectedAdditional,
  selectedWarranty,
  warrantyPrice,
  extendedWarranty,
  extendedWarrantyPrice,
  deposit,
  selectedBattery,
  batteryCost,
  totalAmount,
  userRole,
  location,
}) => {
  // Выбор названия тарифа для отображения
  const warrantyLabel = selectedWarranty?.value === 'premium' ? 'Премиум' : 'Стандартная гарантия';
  const currency = location;
  const format = val => formatPrice(val, currency);
  console.log('Extended Warranty', extendedWarranty);

  return (
    <div className="summary">
      <h2 className="summary-title">Итого</h2>
      <ul className="summary-list">
        <li className="summary-item">
          <span>Срок аренды</span>
          <span>{rentalPeriod?.categoryName || '1 неделя'}</span>
        </li>
        <li className="summary-item">
          <span>Электровелосипед</span>
          <span>{format(rentalPrice)}</span>
        </li>
        {selectedAdditional?.length > 0 &&
          selectedAdditional.map(opt => (
            <li className="summary-item" key={opt.id}>
              <span>{opt.label}</span>
              <span>{format(Number(opt.price))}</span>
            </li>
          ))}
        {selectedWarranty?.value !== 'none' && (
          <li className="summary-item">
            <span>{warrantyLabel}</span>
            <span>{warrantyPrice === 0 ? 'Бесплатно' : format(warrantyPrice)}</span>
          </li>
        )}
        {extendedWarranty && (
          <li className="summary-item">
            <span>Расширенная гарантия</span>
            <span>{extendedWarrantyPrice === 0 ? 'Бесплатно' : format(extendedWarrantyPrice)}</span>
          </li>
        )}
        <li className="summary-item">
          <span>Возвращаемый депозит</span>
          <span>{format(deposit)}</span>
        </li>
        {selectedBattery && (
          <li className="summary-item">
            <span>Аккумулятор {selectedBattery.label}:</span>
            <span>{format(batteryCost)}</span>
          </li>
        )}
        <li className="summary-item">
          <span>Передние / задние фонари и поворотники</span>
          <span>Бесплатно</span>
        </li>
        <li className="summary-item">
          <span>Держатель для телефона</span>
          <span>Бесплатно</span>
        </li>
      </ul>
      <div className="total">
        <span>Итого к оплате:</span>
        <span className="total-amount">{format(totalAmount)}</span>
      </div>
    </div>
  );
};

export default SidebarSummary;
