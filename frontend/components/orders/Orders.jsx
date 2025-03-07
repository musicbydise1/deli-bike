"use client";
import React, { useState, useEffect } from "react";

// Вспомогательная функция для форматирования цены в тенге
function formatTenge(value) {
    return Number(value).toLocaleString("ru-RU") + " ₸";
}

export default function OrderDetails({ orderId }) {
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загружаем один конкретный заказ
    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await fetch(`http://91.243.71.138:4000/rentals/${orderId}`);
                if (!response.ok) {
                    throw new Error("Не удалось загрузить данные о заказе");
                }
                const data = await response.json();
                // Ожидаем структуру { isSuccess, message, data: { ... } }
                setRental(data.data || null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return <p className="p-4">Загрузка заказа...</p>;
    }

    if (error) {
        return <p className="p-4 text-red-500">Ошибка: {error}</p>;
    }

    // Если данных о заказе нет
    if (!rental) {
        return (
            <div className="p-4">
                <nav className="text-sm text-gray-500 mb-4">
                    Главная <span className="mx-1">/</span> Deli Lux
                </nav>
                <h1 className="text-2xl font-bold mb-2">ЗАКАЗ</h1>
                <p>Заказ не найден.</p>
            </div>
        );
    }

    // Распарсим нужные поля
    const { id, startDate, endDate, totalPrice, bike } = rental;

    // Дата заказа
    const orderStartStr = new Date(startDate).toLocaleDateString("ru-RU");
    const orderEndStr = new Date(endDate).toLocaleDateString("ru-RU");

    // Пример дополнительных позиций (как на макете)
    const extraItems = [
        { name: "Срок аренды x 2", price: 31567 },
        { name: "Термокомплект x 2", price: 341 },
        { name: "Возвратный депозит x 2", price: 0 },
        { name: "Дезинфекция для термоса x 2", price: 0 },
    ];
    const extraSum = extraItems.reduce((acc, i) => acc + i.price, 0);

    // Общая сумма (аренда + дополнительные позиции)
    const grandTotal = parseFloat(totalPrice) + extraSum;

    // Допустим, срок аренды истекает через 14 дней (пример)
    const daysLeft = 14;

    return (
        <div className="p-4 md:p-6 lg:p-8 mt-[6rem]">
            {/* Заголовок и даты */}
            <h1 className="text-2xl font-bold mb-2">ЗАКАЗ №{id}</h1>
            <p className="text-sm text-gray-500 mb-6">
                Дата заказа: {orderStartStr} - {orderEndStr}
            </p>

            {/* Сетка: слева таблица, справа блок с подсчётами */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Левая колонка (2/3): список товаров (таблица) */}
                <div className="md:col-span-2">
                    <div className="border border-gray-200 rounded p-4">
                        <table className="min-w-full text-sm">
                            <thead className="border-b">
                            <tr>
                                <th className="py-2 text-left text-gray-700 font-medium">Товар</th>
                                <th className="py-2 text-left text-gray-700 font-medium">Количество</th>
                                <th className="py-2 text-left text-gray-700 font-medium">Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Так как теперь один заказ - одна позиция, покажем bike как 1 строку */}
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-2">
                                    <div className="flex items-center space-x-2">
                                        {bike?.imageUrls && bike.imageUrls.length > 0 ? (
                                            <img
                                                src={bike.imageUrls[0]}
                                                alt="Bike"
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded" />
                                        )}
                                        <div>
                                            <div className="font-semibold">{bike?.name || "Без названия"}</div>
                                            <div className="text-xs text-gray-500">
                                                {bike?.model || "Без модели"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                {/* Количество и сумма можно указывать динамически */}
                                <td className="py-2">6 шт</td>
                                <td className="py-2">{formatTenge(totalPrice)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Правая колонка (1/3): блок с подсчётами и кнопками */}
                <div>
                    <div className="border border-gray-200 rounded p-4 space-y-2">
                        {extraItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-700">
                                <span>{item.name}</span>
                                <span>
                  {item.price > 0 ? formatTenge(item.price) : "Бесплатно"}
                </span>
                            </div>
                        ))}

                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                            <span>Итого к оплате:</span>
                            <span>{formatTenge(grandTotal)}</span>
                        </div>

                        <div className="mt-4 text-sm text-gray-700">
                            Срок аренды истекает через{" "}
                            <span className="text-orange-500 font-medium">{daysLeft} дней</span>
                        </div>

                        <div className="flex space-x-2 mt-4">
                            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
                                Продлить
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition">
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}