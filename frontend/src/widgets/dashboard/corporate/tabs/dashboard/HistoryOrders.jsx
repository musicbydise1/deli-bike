'use client';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HistoryOrders({ historyRentals, setActiveTab }) {
  const router = useRouter();

  // Берем только последние 3 заказа
  const lastThreeRentals = historyRentals.slice(-3);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">ПОСЛЕДНИЕ ЗАКАЗЫ</h3>
      <div className="space-y-3">
        {lastThreeRentals.length === 0 ? (
          <p className="text-sm text-gray-500">Нет заказов в истории</p>
        ) : (
          lastThreeRentals.map(rental => {
            const bikeInfo = rental.bike || {};
            return (
              <div key={rental.id} className="relative border border-gray-200 rounded-lg p-3">
                {/* Иконка «глаз» в правом верхнем углу */}
                <div className="absolute top-2 right-2">
                  <Link href={`/orders/${rental.id}`}>
                    <AiOutlineEye className="cursor-pointer text-orange-500 text-xl" />
                  </Link>
                </div>

                <div className="flex">
                  <div className="w-14 h-14 bg-gray-100 flex items-center justify-center mr-3">
                    {bikeInfo.imageUrls && bikeInfo.imageUrls.length > 0 ? (
                      <Image
                        src={bikeInfo.imageUrls[0]}
                        alt="Bike"
                        className="h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">IMG</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Заказ №{rental.id}</div>
                    <div className="font-semibold text-sm uppercase">
                      {bikeInfo.name || 'Без названия'} {bikeInfo.model}
                    </div>
                    <div className="text-xs text-gray-400">
                      Срок аренды:{' '}
                      <span className="text-black">
                        {new Date(rental.startDate).toLocaleDateString('ru-RU')} –{' '}
                        {new Date(rental.endDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Статус: {rental.status}</div>
                  </div>
                </div>

                {/* Блок с аксессуарами и суммой (как на скриншоте) */}
                <div className="mt-2 flex space-x-2">
                  <div className="bg-orange-50 text-orange-500 px-2 py-1 rounded text-xs">
                    Аксессуаров: {rental.accessoriesCount ?? 0} шт
                  </div>
                  <div className="bg-orange-50 text-orange-500 px-2 py-1 rounded text-xs">
                    Сумма: {Math.round(rental.totalPrice).toLocaleString('ru-RU') ?? 0} ₸
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4">
        {/* Переходим на /orders при клике */}
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition"
          onClick={() => setActiveTab('rent')}
        >
          Все заказы
        </button>
      </div>
    </div>
  );
}
