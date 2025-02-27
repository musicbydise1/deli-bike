"use client";

import React from "react";

export default function OrdersTab() {
    return (
        <div className="tab-content">
            <h3>Управление заказами</h3>
            <p>Здесь отображаются все заказы. Вы можете изменять статус заказов и просматривать их детали.</p>
            {/* Пример UI для списка заказов */}
            <ul className="order-list">
                <li>
                    <span>Заказ #12345</span>
                    <span>Клиент: Анна Смирнова</span>
                    <span>Статус: В обработке</span>
                    <button>Подробнее</button>
                </li>
                <li>
                    <span>Заказ #12346</span>
                    <span>Клиент: Павел Петров</span>
                    <span>Статус: Доставлен</span>
                    <button>Подробнее</button>
                </li>
                {/* Добавьте больше заказов, если нужно */}
            </ul>
        </div>
    );
}