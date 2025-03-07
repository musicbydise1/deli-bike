"use client";
import React from "react";
import { FiEye } from "react-icons/fi";

export default function CouriersTab() {
    // Пример статических данных для таблицы
    const couriers = [
        {
            id: "CC01",
            name: "Абуов Алихан Аманжанович",
            startDate: "19.06.2022",
            endDate: "19.07.2022",
            itemsCount: "6 шт",
            sum: "73 852 ₸",
        },
        {
            id: "CC01",
            name: "Абуов Алихан Аманжанович",
            startDate: "19.06.2022",
            endDate: "19.07.2022",
            itemsCount: "6 шт",
            sum: "73 852 ₸",
        },
        {
            id: "CC01",
            name: "Абуов Алихан Аманжанович",
            startDate: "19.06.2022",
            endDate: "19.07.2022",
            itemsCount: "6 шт",
            sum: "73 852 ₸",
        },
        // Добавьте больше элементов по необходимости
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Шапка страницы: заголовок, подзаголовок и кнопка */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">КУРЬЕРЫ</h1>
                    <p className="text-gray-600">Персональный центр управления вашей арендой</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition uppercase">
                    + ДОБАВИТЬ КУРЬЕРА
                </button>
            </div>

            {/* Блок с информацией (доступно товаров) */}
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 mb-4 rounded">
                Доступно товаров для закрепления — 12
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm rounded-sm">
                    <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Модель</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Срок сотрудничества</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Закреплено товаров</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Сумма</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {couriers.map((c, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{c.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{c.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                                {c.startDate} - {c.endDate}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{c.itemsCount}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{c.sum}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 text-right">
                                {/* Иконка глаза (просмотр деталей) */}
                                <button className="text-gray-500 hover:text-gray-700">
                                    <FiEye />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}