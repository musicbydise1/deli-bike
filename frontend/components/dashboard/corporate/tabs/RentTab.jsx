'use client';
import React, { useState, useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RentTab() {
  const router = useRouter();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchRentals() {
      try {
        const response = await fetch(`${API_URL}/rentals/`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные об арендах');
        }
        const data = await response.json();
        // Ожидаем структуру { isSuccess, message, data: [...] }
        setRentals(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRentals();
  });

  if (loading) {
    return <p className="p-4">Загрузка заказов...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Ошибка: {error}</p>;
  }

  const handleViewClick = id => {
    // Переход на страницу конкретного заказа
    // Например, если у вас маршрут /rentals/[id], делаем:
    router.push(`/orders/${id}`);
  };

  return (
    <div>
      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-6">ЗАКАЗЫ</h1>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm rounded-sm">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Модель</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">№ заказа</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Дата заказа</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Товаров в заказе</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Сумма</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentals.map(rental => {
              const bike = rental.bike || {};
              const startDate = new Date(rental.startDate).toLocaleDateString('ru-RU');
              const endDate = new Date(rental.endDate).toLocaleDateString('ru-RU');
              // Допустим, у нас всегда "1 шт" в заказе
              const itemsCount = '1 шт';
              // Форматируем цену в тенге
              const priceTenge = Number(rental.totalPrice).toLocaleString('ru-RU') + ' ₸';

              return (
                <tr key={rental.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {/* Фотография + Название и Модель */}
                    <div className="flex items-center space-x-2">
                      {bike.imageUrls && bike.imageUrls.length > 0 ? (
                        <Image
                          src={bike.imageUrls[0]}
                          alt="Bike"
                          className="w-[64px] h-[64px] object-cover rounded"
                        />
                      ) : (
                        <div className="w-[64px] h-[64px] bg-gray-200 rounded" />
                      )}
                      <div>
                        <div className="font-semibold">{bike.name || 'Без названия'}</div>
                        <div className="text-xs text-gray-500">{bike.model || 'Без модели'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">№{rental.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {startDate} - {endDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">{itemsCount}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">{priceTenge}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    <button
                      onClick={() => handleViewClick(rental.id)}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
