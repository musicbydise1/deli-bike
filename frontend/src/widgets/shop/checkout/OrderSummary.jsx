'use client';
import React from 'react';

export function OrderSummary({ cartProducts, totalPrice, t }) {
  return (
    <div className="order-box">
      <h6 className="title">{t('checkout.yourOrder')}</h6>
      <ul className="order-list">
        <li>
          {t('checkout.product')} <span>{t('checkout.subtotal')}</span>
        </li>
        {cartProducts.map((elm, i) => (
          <li key={i} className="v2">
            {elm.name} {elm.model} x{elm.quantity}
            <span>{elm.price.toLocaleString('ru-RU')} ₸</span>
          </li>
        ))}
        <li>
          {t('checkout.subtotal')} <span>{totalPrice.toLocaleString('ru-RU')} ₸</span>
        </li>
        <li>
          {t('checkout.total')} <span>{(totalPrice + 20).toLocaleString('ru-RU')} ₸</span>
        </li>
      </ul>
    </div>
  );
}
