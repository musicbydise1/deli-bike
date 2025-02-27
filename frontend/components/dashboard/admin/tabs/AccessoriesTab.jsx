"use client";

import React from "react";

export default function AccessoriesTab() {
    return (
        <div className="tab-content">
            <h3>Управление аксессуарами</h3>
            <p>Добавляйте или редактируйте аксессуары, которые можно арендовать или купить вместе с велосипедами.</p>
            {/* Пример UI для списка аксессуаров */}
            <ul className="accessory-list">
                <li>
                    <span>Название: Шлем защитный</span>
                    <span>Цена: 1000 тг</span>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                </li>
                <li>
                    <span>Название: Фара передняя</span>
                    <span>Цена: 500 тг</span>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                </li>
                {/* Добавьте больше аксессуаров, если нужно */}
            </ul>
        </div>
    );
}