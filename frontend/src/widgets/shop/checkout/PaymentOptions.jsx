'use client';
import React from 'react';

export function PaymentOptions({ selectedPaymentMethod, setSelectedPaymentMethod, t }) {
  return (
    <div className="payment-options">
      <ul>
        <li>
          <div className="shipp">
            <input
              type="radio"
              id="c4"
              name="cc2"
              value="direct_bank_transfer"
              checked={selectedPaymentMethod === 'direct_bank_transfer'}
              onChange={e => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="c4">
              <span />
              <small>{t('checkout.directBankTransfer')}</small>
            </label>
          </div>
          <p>{t('checkout.directBankTransferDesc')}</p>
        </li>
        <li>
          <div className="shipp">
            <input
              type="radio"
              id="c5"
              name="cc2"
              value="cash"
              checked={selectedPaymentMethod === 'cash'}
              onChange={e => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="c5">
              <span />
              <small>Оплата наличными</small>
            </label>
          </div>
        </li>
        <li>
          <div className="shipp">
            <input
              disabled
              type="radio"
              id="c6"
              name="cc2"
              value="kaspi_bank"
              checked={selectedPaymentMethod === 'kaspi_bank'}
              onChange={e => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="c6">
              <span />
              <small>Kaspi Bank</small>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}
