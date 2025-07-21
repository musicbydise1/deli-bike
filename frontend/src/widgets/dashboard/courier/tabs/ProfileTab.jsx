'use client';
import React, { useState, useEffect } from 'react';
import { FiCheck, FiUser } from 'react-icons/fi';
import Image from 'next/image';

export default function ProfileTab() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // При монтировании читаем данные из localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Ошибка парсинга userData:', error);
      }
    }
  }, []);

  // Если в localStorage нет данных
  if (!userData) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>
        <p className="text-gray-600">Данные пользователя не найдены.</p>
      </div>
    );
  }

  // Проверяем, есть ли у пользователя фото профиля
  const hasProfileImage = !!userData.profileImage;

  return (
    <div>
      <h1 className="text-2xl font-bold">Мой профиль</h1>
      <div className="max-w-4xl mx-auto">
        {/* Аватарка по центру */}
        <div className="flex justify-center mb-6">
          {hasProfileImage ? (
            <Image
              src={userData.profileImage}
              alt="Аватар пользователя"
              className="w-32 h-32 object-cover rounded-full border"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full border">
              <FiUser size={48} />
            </div>
          )}
        </div>

        {/* Информация о пользователе */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Имя и фамилия */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Имя</label>
            <div className="text-base text-gray-800 font-semibold">{userData.firstName || '—'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Фамилия</label>
            <div className="text-base text-gray-800 font-semibold">{userData.lastName || '—'}</div>
          </div>

          {/* Отчество и Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Отчество</label>
            <div className="text-base text-gray-800">{userData.patronymic || '—'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="text-base text-gray-800">{userData.email}</div>
          </div>

          {/* Телефон и ИИН */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Телефон</label>
            <div className="text-base text-gray-800">{userData.phoneNumber || '—'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Telegram</label>
            <div className="text-base text-gray-800">
              {userData.telegramChatId ? (
                <div className="text-base text-green-600 flex items-center space-x-1">
                  <span>Привязан</span>
                  <FiCheck />
                </div>
              ) : (
                <div className="text-base text-gray-800">—</div>
              )}
            </div>
          </div>

          {/* Компания и Адрес */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Компания</label>
            <div className="text-base text-gray-800">{userData.companyName || '—'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Адрес</label>
            <div className="text-base text-gray-800">{userData.address || '—'}</div>
          </div>

          {/* Баланс и Валюта */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Баланс</label>
            <div className="text-base text-gray-800">
              {userData.walletBalance || '0.00'} {userData.preferredCurrency || ''}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Роль</label>
            <div className="text-base text-gray-800 capitalize">
              {userData.roles?.[0]?.name || 'user'}
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mt-6 flex justify-center space-x-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
            Редактировать
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition">
            Изменить пароль
          </button>
        </div>
      </div>
    </div>
  );
}
