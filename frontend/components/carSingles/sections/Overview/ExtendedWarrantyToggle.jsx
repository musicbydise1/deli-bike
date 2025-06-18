'use client';
import React from 'react';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { formatPrice, getExtendedWarrantyPrice, getSuffix } from '@/utils/pricingUtils';
import { proWarrantyPricing } from '@/data/pricing';

export default function ExtendedWarrantyToggle({
  extendedWarranty,
  onToggle,
  rentalValue,
  role,
  currency,
}) {
  const extendedPrice = getExtendedWarrantyPrice(
    extendedWarranty,
    rentalValue,
    role,
    currency,
    proWarrantyPricing,
  );
  const suffix = getSuffix(rentalValue);
  return (
    <div>
      <div className="form-check my-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="extendedWarranty"
          checked={extendedWarranty}
          onChange={e => onToggle(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="extendedWarranty">
          Дополнительная «Расширенная гарантия»
        </label>
      </div>
      {extendedWarranty && (
        <p className="mt-1 text-sm">
          Стоимость расширенной гарантии:{' '}
          <strong>
            {formatPrice(extendedPrice, currency)}
            {suffix}
          </strong>
        </p>
      )}
    </div>
  );
}
