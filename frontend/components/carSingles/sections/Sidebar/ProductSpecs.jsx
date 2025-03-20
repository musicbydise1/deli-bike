// src/components/Sidebar/ProductSpecs.jsx
"use client";
import React from "react";

const ProductSpecs = ({ product }) => {
    return (
        <div className="specifications">
            <h2 className="specifications-title">Характеристики</h2>
            <ul className="specifications-list">
                <li className="specifications-item">
                    <span>Макс. скорость</span>
                    <span>{Math.round(product.maxSpeed)} км/ч</span>
                </li>
                <li className="specifications-item">
                    <span>Пробег на 1 заряде:</span>
                    <span>{Math.round(product.rangePerCharge)} км</span>
                </li>
                <li className="specifications-item">
                    <span>Время зарядки</span>
                    <span>{product.chargeTime} ч</span>
                </li>
                <li className="specifications-item">
                    <span>Макс. нагрузка</span>
                    <span>{Math.round(product.maxLoad)} кг</span>
                </li>
                <li className="specifications-item">
                    <span>Вес</span>
                    <span>{Math.round(product.weight)} кг</span>
                </li>
                <li className="specifications-item">
                    <span>Мощность</span>
                    <span>{product.power} Вт</span>
                </li>
                <li className="specifications-item">
                    <span>Привод</span>
                    <span>{product.suspension}</span>
                </li>
            </ul>
        </div>
    );
};

export default ProductSpecs;