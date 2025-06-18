'use client';
import React from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ui/progress-bar/ProgressBar';
import Image from 'next/image';

export default function ActiveOrderCard({ activeOrder }) {
  const bike = activeOrder.bike || {};

  // Начало и конец аренды
  const start = new Date(activeOrder.startDate);
  const end = new Date(activeOrder.endDate);
  const now = new Date();

  // Сколько всего дней между startDate и endDate
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  // Сколько дней прошло с начала аренды до текущего момента
  const daysPassed = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));

  // Чтобы «шкала» не уходила за границы
  const activeIndex = Math.min(daysPassed, totalDays);

  // Сколько дней осталось
  const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-700">Заказ №{activeOrder.id}</div>
          <div className="text-xl font-semibold uppercase">
            {bike.name || 'Название байка'} {bike.model}
          </div>
        </div>
      </div>

      <div className="h-48 mb-4 flex items-center justify-center">
        {bike.imageUrls && bike.imageUrls.length > 0 ? (
          <Image src={bike.imageUrls[0]} alt="Bike" className="h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-base">IMAGE</span>
        )}
      </div>

      {/* Если статус on_payment – выводим альтернативный блок */}
      {activeOrder.status === 'on_payment' ? (
        <>
          <div className="text-sm mb-2 text-red-600">
            Ваш заказ ещё не оплачен. Необходимо оплатить в течение
            <span className="font-semibold"> 72 часов</span> и забрать велосипед в отделении.
          </div>
          <div className="flex space-x-3">
            <a
              href="/invoice"
              className="w-full text-[14px] bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition uppercase text-center"
            >
              Перейти к счёту
            </a>
          </div>
        </>
      ) : (
        <>
          {/* Обычный блок при других статусах */}
          <div className="text-sm mb-2 text-gray-700">
            Срок аренды истекает через{' '}
            <span className="text-orange-500 font-medium">{daysLeft} дней</span>
          </div>

          <div className="mb-4">
            <ProgressBar totalBars={totalDays} activeIndex={activeIndex} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{start.toLocaleDateString('ru-RU')}</span>
              <span>{end.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="w-full text-[14px] bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition uppercase">
              Продлить
            </button>
            <Link
              href={`/orders/${activeOrder.id}`}
              className="w-full text-[14px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition uppercase text-center"
            >
              Подробнее
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
