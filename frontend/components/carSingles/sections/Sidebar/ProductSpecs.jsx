// src/components/Sidebar/ProductSpecs.jsx
'use client';
import React from 'react';

const ProductSpecs = ({ product }) => {
  return (
    <div className="specifications">
      <h2 className="specifications-title">Характеристики</h2>
      <ul className="specifications-list">
        <li className="specifications-item">
          <span>Макс. скорость</span>
          <span>Ограничена до {Math.round(product.max_speed)} км/ч</span>
        </li>
        <li className="specifications-item">
          <span>Пробег на 1 заряде:</span>
          <span>{product.range_per_charge} км (зависит от АКБ)</span>
        </li>
        <li className="specifications-item">
          <span>Время зарядки</span>
          <span>{product.charge_time} ч</span>
        </li>
        <li className="specifications-item">
          <span>Макс. нагрузка</span>
          <span>до {Math.round(product.max_load)} кг</span>
        </li>
        <li className="specifications-item">
          <span>Вес</span>
          <span>{Math.round(product.weight)} кг</span>
        </li>
        <li className="specifications-item">
          <span>Привод</span>
          <span>{product.suspension}</span>
        </li>
        <li className="specifications-item">
          <span>Тормоза</span>
          <span>{product.brakes}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductSpecs;
