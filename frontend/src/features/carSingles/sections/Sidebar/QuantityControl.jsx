// src/components/Sidebar/QuantityControl.jsx
'use client';
import React from 'react';

const QuantityControl = ({ quantity, setQuantity }) => {
  return (
    <div className="quantity-control-container">
      <div className="quantity-control-text">
        <p>Количество:</p>
      </div>
      <div className="quantity-control">
        <button className="quantity-btn" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button className="quantity-btn" onClick={() => setQuantity(prev => prev + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
