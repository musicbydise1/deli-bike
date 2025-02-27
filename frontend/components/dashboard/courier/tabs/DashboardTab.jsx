"use client";
import React from "react";

export default function DashboardTab() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Заголовок и подзаголовок */}
            <h1 className="text-2xl font-bold mb-1">Личный кабинет</h1>
            <p className="text-gray-600 mb-6">Персональный центр управления вашей арендой</p>

            {/* Основной контейнер: левая (2/3) и правая (1/3) колонки */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Левая часть: карточка текущего заказа */}
                <div className="md:col-span-2">
                    <div className="border border-gray-200 rounded-lg p-4 md:p-6">
                        {/* Шапка: Номер заказа и название, справа – цветной блок (статус или иконка) */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="text-sm text-gray-700">Заказ №2471</div>
                                <div className="text-xl font-semibold">DELI LUX</div>
                            </div>
                            {/* Можно заменить цвет/иконку по своему вкусу */}
                            <div className="w-8 h-8 bg-orange-500 rounded" />
                        </div>

                        {/* Большой блок под изображение */}
                        <div className="bg-orange-100 h-48 mb-4 flex items-center justify-center">
                            <span className="text-gray-400 text-base">IMAGE</span>
                        </div>

                        {/* Информация о сроке */}
                        <div className="text-sm mb-2 text-gray-700">
                            Срок аренды истекает через{" "}
                            <span className="text-orange-500 font-medium">14 дней</span>
                        </div>

                        {/* Прогресс-бар */}
                        <div className="mb-4">
                            {/* Даты по краям */}
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>10.07.2024</span>
                                <span>10.08.2024</span>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded">
                                {/* Заполненная часть (примерно 50%) */}
                                <div
                                    className="absolute left-0 top-0 h-2 bg-orange-500 rounded"
                                    style={{ width: "50%" }}
                                />
                            </div>
                        </div>

                        {/* Кнопки действия */}
                        <div className="flex space-x-3">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
                                Продлить
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition">
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>

                {/* Правая часть: список последних заказов */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">ПОСЛЕДНИЕ ЗАКАЗЫ</h3>
                    <div className="space-y-3">
                        {/* Пример одного заказа */}
                        <div className="flex border border-gray-200 rounded-lg p-3">
                            <div className="w-14 h-14 bg-gray-100 flex items-center justify-center mr-3">
                                <span className="text-sm text-gray-400">IMG</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">DELI LUX</div>
                                <div className="text-xs text-gray-500">Заказ №2471</div>
                                <div className="text-xs text-gray-500">Адрес: Алматы Суюнбая 153</div>
                                <div className="text-xs text-gray-400 mt-1">Бренд: WIX | 267AA226</div>
                            </div>
                        </div>
                        {/* Повторите блоки для других заказов */}
                        <div className="flex border border-gray-200 rounded-lg p-3">
                            <div className="w-14 h-14 bg-gray-100 flex items-center justify-center mr-3">
                                <span className="text-sm text-gray-400">IMG</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">Турбокомпрессор PM</div>
                                <div className="text-xs text-gray-500">24 710 ₸</div>
                                <div className="text-xs text-gray-500">Адрес: Алматы Суюнбая 153</div>
                                <div className="text-xs text-gray-400 mt-1">Бренд: WIX | 267AA226</div>
                            </div>
                        </div>
                        <div className="flex border border-gray-200 rounded-lg p-3">
                            <div className="w-14 h-14 bg-gray-100 flex items-center justify-center mr-3">
                                <span className="text-sm text-gray-400">IMG</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">Турбокомпрессор PM</div>
                                <div className="text-xs text-gray-500">24 710 ₸</div>
                                <div className="text-xs text-gray-500">Адрес: Алматы Суюнбая 153</div>
                                <div className="text-xs text-gray-400 mt-1">Бренд: WIX | 267AA226</div>
                            </div>
                        </div>
                    </div>

                    {/* Кнопка "Все заказы" */}
                    <div className="mt-4">
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition">
                            Все заказы
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}