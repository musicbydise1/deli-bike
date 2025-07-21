'use client';
import React, { useState, useEffect } from 'react';
import {
  useGetRentalsByUserQuery,
  useGetRentalHistoryByUserQuery,
} from '@/store/services/rentalsApi';
import NoActiveOrderTiles from './NoActiveOrderTiles';
import ActiveOrderCard from './ActiveOrderCard';
import HistoryOrders from './HistoryOrders';
import SupportAccordion from './SupportAccordion';

export default function DashboardTab({ setActiveTab }) {
  const [userId, setUserId] = useState(null);
  const [activeRentals, setActiveRentals] = useState([]);
  const [historyRentals, setHistoryRentals] = useState([]);
  const {
    data: activeData,
    isLoading: loadingActive,
    error: activeError,
  } = useGetRentalsByUserQuery(userId, { skip: userId === null });
  const {
    data: historyData,
    isLoading: loadingHistory,
    error: historyError,
  } = useGetRentalHistoryByUserQuery(userId, { skip: userId === null });
  const loading = loadingActive || loadingHistory;
  const error = activeError || historyError;

  // Состояние для аккордеона
  const [openIndex, setOpenIndex] = useState(null);
  const toggleItem = index => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Массив пунктов поддержки
  const supportItems = [
    {
      title: 'Техническое обслуживание',
      content:
        'Информация о сервисном обслуживании, периодичности ТО, контактах сервисных центров и т.д.',
    },
    {
      title: 'Правила эксплуатации электробайков',
      content: 'Основные рекомендации по использованию, безопасной езде и уходе за электробайком.',
    },
    {
      title: 'Правила эксплуатации АКБ (аккумуляторов)',
      content:
        'Информация о зарядке, хранении и обслуживании аккумуляторных батарей, чтобы продлить срок службы.',
    },
    {
      title: 'Связаться с нами',
      content:
        'Телефон горячей линии: +7 (777) 123-45-67. Email: support@delilux.kz. Адрес: г. Алматы, пр. Достык, 123.',
    },
  ];

  // Считываем userId из localStorage
  useEffect(() => {
    const raw = localStorage.getItem('userData');
    if (raw) {
      try {
        const user = JSON.parse(raw);
        setUserId(user.id);
      } catch (err) {
        console.error('Не удалось распарсить userData:', err);
      }
    } else {
      console.warn('userData нет в localStorage');
    }
  }, []);

  // Обновляем локальное состояние при получении данных из API
  useEffect(() => {
    if (activeData?.data) {
      setActiveRentals(activeData.data);
    }
  }, [activeData]);

  useEffect(() => {
    if (historyData?.data) {
      setHistoryRentals(historyData.data);
    }
  }, [historyData]);

  if (loading) {
    return <p className="p-4">Загрузка данных об арендах...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Ошибка: {error}</p>;
  }

  // Ищем заказ со статусом 'active' или 'on_payment'
  const activeOrder = activeRentals.find(r => r.status === 'active' || r.status === 'on_payment');

  // Если нет активного заказа — показываем плитки
  if (!activeOrder) {
    return (
      <>
        <NoActiveOrderTiles />
        <SupportAccordion
          supportItems={supportItems}
          openIndex={openIndex}
          toggleItem={toggleItem}
        />
      </>
    );
  }

  // Если есть активный заказ — показываем карточку + историю + поддержку
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-1">Личный кабинет</h1>
      <p className="text-gray-600 mb-6">Персональный центр управления вашей арендой</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Левая часть: активный заказ */}
        <div className="md:col-span-2">
          <ActiveOrderCard activeOrder={activeOrder} />
        </div>

        {/* Правая часть: история */}
        <HistoryOrders historyRentals={historyRentals} setActiveTab={setActiveTab} />
      </div>

      <SupportAccordion supportItems={supportItems} openIndex={openIndex} toggleItem={toggleItem} />
    </div>
  );
}
