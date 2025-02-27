"use client";

import React from "react";

export default function CouriersTab() {
    return (
        <div className="tab-content">
            <h3>Управление курьерами</h3>
            <p>Управляйте списком курьеров, назначайте заказы и отслеживайте их статус.</p>
            {/* Пример списка курьеров */}
            <ul className="courier-list">
                <li>
                    <span>Имя: Алексей Трофимов</span>
                    <span>Статус: Онлайн</span>
                    <button>Посмотреть заказы</button>
                </li>
                <li>
                    <span>Имя: Екатерина Иванова</span>
                    <span>Статус: Оффлайн</span>
                    <button>Посмотреть заказы</button>
                </li>
                {/* Добавьте больше курьеров, если нужно */}
            </ul>
        </div>
    );
}